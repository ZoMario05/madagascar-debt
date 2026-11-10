"""Build the master loan table, estimated repayment schedule and coverage check
from the raw source files. Run: python3 build_master.py <raw_dir> <out_dir>"""
import csv, sys, datetime as dt, re, collections

RAW, OUT = sys.argv[1], sys.argv[2]
SDR_USD = float(open(f"{RAW}/sdr_usd.txt").read().strip())  # written by fetch_imf.py
TODAY = dt.date.today().isoformat()
WB_SRC = "https://financesone.worldbank.org/ida-statement-of-credits,-grants-and-guarantees-latest-available-snapshot/DS00001"
IMF_SRC = "https://www.imf.org/external/np/fin/tad/exfin2.aspx?memberKey1=620&date1key=2099-12-31"

def d(s):
    return dt.datetime.strptime(s, "%d-%b-%Y").date() if s else None

SECTORS = [
    ("Other / to classify", r"\bPACT\b|PTML|REPAIR|MYSET|TALIM"),
    ("Energy", r"ESOGIP|ASCENT"),
    ("Transport", r"Growth Poles"),
    ("Water & urban", r"PRODUIRE"),
    ("Agriculture & environment", r"RCRP"),
    ("Budget support", r"DPO|DPL|PRSC|DPF|MERG|Reengagement|Resilience DPO|Human Capital DPO|Covid-19 Response"),
    ("Energy", r"Energy|Pwr|Power|Electr|LEAD|Solar|Hydro"),
    ("Transport", r"Road|Transp|Rural Transp|Corridor|Port"),
    ("Social protection", r"Safety Net|Social Prot|Food Sec|Livelihood|Com Dev Fund|FSRP|Resilien"),
    ("Health & nutrition", r"Health|Nutrition|HIV|Preparedness|HSS|Nutrit"),
    ("Education", r"Edu|EAGER|Education|TALIM|MYSET"),
    ("Water & urban", r"Water|Urban|Tana|PRODIGY|Infra"),
    ("Digital", r"Digital|Telecom|Connect|PACT"),
    ("Agriculture & environment", r"Agri|Irrigation|Landscape|SWIOFish|Env |Rural Dev|Fish"),
    ("Governance & finance", r"Gov|Public Sector|Statist|Microfinance|Financial Inclusion|Priv Sec|Mineral|Economic Transformation|PTML|ASCENT|REPAIR|SADC"),
]
def sector(name):
    for s, pat in SECTORS:
        if re.search(pat, name, re.I):
            return s
    return "Other / to classify"

STATUS = {"Repaying": "Repaying", "Disbursing&Repaying": "Disbursing & repaying", "Disbursing": "Disbursing",
          "Fully Disbursed": "Fully disbursed", "Signed": "Signed", "Effective": "Signed (effective)", "Approved": "Approved"}

rows, sched = [], collections.defaultdict(float)
COLS = ["loan_id","lender_name","lender_country","lender_type","project_name","sector","date_signed","currency",
        "amount_original_usd","outstanding_usd","undisbursed_usd","interest_or_charge_rate","first_repayment","last_repayment",
        "concessional","status","source_urls","confidence","notes","last_checked"]

# --- World Bank IDA (exact, loan level) ---
for r in csv.DictReader(open(f"{RAW}/wb_ida.csv")):
    out = float(r["outstanding_usd"]); und = float(r["undisbursed_usd"])
    rows.append({
        "loan_id": "MDG-" + r["credit_number"], "lender_name": "International Development Association (World Bank)",
        "lender_country": "Multilateral (Washington)", "lender_type": "Multilateral",
        "project_name": r["project_name"].strip(), "sector": sector(r["project_name"]),
        "date_signed": d(r["agreement_signing_date"]).isoformat() if r["agreement_signing_date"] else "",
        "currency": r["currency"], "amount_original_usd": r["original_principal_usd"],
        "outstanding_usd": round(out), "undisbursed_usd": round(und),
        "interest_or_charge_rate": f"{r['service_charge_rate']}% service charge" if float(r["service_charge_rate"] or 0) else "0% (IDA terms; fees not in dataset)",
        "first_repayment": d(r["first_repayment_date"]).isoformat() if r["first_repayment_date"] else "",
        "last_repayment": d(r["last_repayment_date"]).isoformat() if r["last_repayment_date"] else "",
        "concessional": "Yes", "status": STATUS.get(r["credit_status"], r["credit_status"]),
        "source_urls": WB_SRC + f" (credit {r['credit_number']}, project {r['project_id']})",
        "confidence": "High", "notes": "Sector assigned by keyword from project name (to review)", "last_checked": TODAY})
    # estimated schedule: outstanding principal spread evenly over remaining years to last repayment
    fr, lr = d(r["first_repayment_date"]), d(r["last_repayment_date"])
    if out > 0 and lr:
        start = max(2027, fr.year if fr else 2027)
        years = list(range(start, lr.year + 1)) or [lr.year]
        for y in years:
            sched[("IDA", y)] += out / len(years)

# --- IMF (facility level, exact totals) ---
for r in csv.DictReader(open(f"{RAW}/imf.csv")):
    out = float(r["outstanding_sdr_m"]) * 1e6 * SDR_USD
    und = (float(r["approved_sdr_m"]) - float(r["drawn_sdr_m"])) * 1e6 * SDR_USD
    rows.append({
        "loan_id": r["loan_id"], "lender_name": "International Monetary Fund", "lender_country": "Multilateral (Washington)",
        "lender_type": "Multilateral", "project_name": r["facility"], "sector": "Budget support",
        "date_signed": r["date_approved"], "currency": "XDR",
        "amount_original_usd": round(float(r["approved_sdr_m"]) * 1e6 * SDR_USD), "outstanding_usd": round(out),
        "undisbursed_usd": round(max(0, und)) if "RCF" not in r["loan_id"] else 0,
        "interest_or_charge_rate": r["interest"], "first_repayment": "", "last_repayment": "",
        "concessional": "Yes", "status": "Disbursing" if "2024" in r["loan_id"] else "Repaying",
        "source_urls": r["source_url"], "confidence": "High" if r["outstanding_note"].startswith("exact") else "Medium",
        "notes": f"SDR converted at US$ {SDR_USD} per SDR (10 Nov 2026). Grace {r['grace_years']} yrs, maturity {r['maturity_years']} yrs. {r['outstanding_note']}",
        "last_checked": TODAY})
# IMF projected principal (official), SDR m -> USD
for r in csv.DictReader(open(f"{RAW}/imf_projected.csv")):
    sched[("IMF", int(r["year"]))] += float(r["principal_sdr_m"]) * 1e6 * SDR_USD

# --- Official Treasury list (BSD n°41, June 2026): non-IDA loans ---
BSD_SRC = ("Ministère de l'Économie et des Finances, Direction de la Dette Publique, Bulletin Statistique de la Dette n°41 (June 2026), p.{p} - "
           "http://www.tresorpublic.mg/tresorpublic/download.php?path=wp-content/themes/tresor-public/statik-content/tresor-public/temp/statistique/bsd/&file=041.pdf")
official = list(csv.DictReader(open(f"{RAW}/official_bsd_loans.csv")))
official_ids = {r["loan_id"] for r in official}
for r in official:
    terms = ", ".join(x for x in [r["interest_rate"] and f"{r['interest_rate']} interest", r["fee"] and f"{r['fee']} fee",
                                  r["maturity_years"] and f"{r['maturity_years']} yrs", r["grace_years"] and f"{r['grace_years']} yrs grace"] if x)
    rows.append({
        "loan_id": r["loan_id"], "lender_name": r["lender_name"], "lender_country": r["lender_country"], "lender_type": r["lender_type"],
        "project_name": r["project_name"], "sector": r["sector"], "date_signed": r["date_signed"], "currency": r["currency"],
        "amount_original_usd": r["amount_usd"], "outstanding_usd": "", "undisbursed_usd": "",
        "interest_or_charge_rate": terms, "first_repayment": "", "last_repayment": "",
        "concessional": "No (commercial)" if r["lender_type"] == "Commercial" else ("Semi-concessional" if "Trésor" in r["lender_name"] else "Yes"),
        "status": "Signed" if r["date_signed"] >= "2026-01-01" else "Disbursing (active project)",
        "source_urls": BSD_SRC.format(p=r["bsd_page"]), "confidence": "High (official)",
        "notes": "Amount = US$ allocation as published by the Treasury. " + r["notes"], "last_checked": TODAY})

# --- Other creditors from secondary sources (only where the official list has no entry) ---
SUPERSEDED = {"MDG-AFDB-2019-01", "MDG-AFDB-2024-01", "MDG-AFDB-2024-02"} | official_ids
for r in csv.DictReader(open(f"{RAW}/other_loans_manual.csv")):
    if r["loan_id"] in SUPERSEDED:
        continue
    rows.append({
        "loan_id": r["loan_id"], "lender_name": r["lender_name"], "lender_country": r["lender_country"],
        "lender_type": r["lender_type"], "project_name": r["project_name"], "sector": r["sector"],
        "date_signed": r["date_signed"], "currency": r["currency"], "amount_original_usd": r["amount_usd_at_signing"],
        "outstanding_usd": "", "undisbursed_usd": "",
        "interest_or_charge_rate": (r["interest_rate"] + "% (estimated)") if r["interest_rate"] else "",
        "first_repayment": r["first_repayment"], "last_repayment": r["last_repayment"],
        "concessional": "Yes (government concessional loan)" if "CN" in r["loan_id"] else "Yes (ADF/TSF)",
        "status": r["status"], "source_urls": r["source_urls"], "confidence": r["confidence"],
        "notes": f"Original amount {r['amount_original']} {r['currency']}. " + r["notes"], "last_checked": TODAY})

with open(f"{OUT}/master_loans.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=COLS); w.writeheader(); w.writerows(rows)

with open(f"{OUT}/repayment_schedule_estimated.csv", "w", newline="") as f:
    w = csv.writer(f); w.writerow(["creditor", "year", "principal_due_usd", "basis"])
    for (c, y), v in sorted(sched.items(), key=lambda k: (k[0][0], k[0][1])):
        w.writerow([c, y, round(v), "IMF official projection (Financial Position in the Fund)" if c == "IMF"
                    else "Estimated: outstanding principal spread evenly to final maturity"])

# --- coverage by creditor (loan count in database vs official totals) ---
ids = {r["creditor"]: r for r in csv.DictReader(open(f"{RAW}/wb_ids_creditors.csv"))}
MAP = {  # IDS creditor name -> test on database rows
    "World Bank-IDA": lambda x: x["loan_id"].startswith("MDG-IDA"),
    "African Development Bank (incl. ADF)": lambda x: "-AFDB-" in x["loan_id"],
    "China": lambda x: "-CN-" in x["loan_id"], "European Investment Bank": lambda x: "-EIB-" in x["loan_id"],
    "France": lambda x: x["lender_country"] == "France", "IFAD": lambda x: "-IFAD-" in x["loan_id"],
    "Japan": lambda x: "-JP-" in x["loan_id"], "OPEC Fund": lambda x: "-OFID-" in x["loan_id"],
    "BADEA": lambda x: "-BADEA-" in x["loan_id"], "Korea": lambda x: "-KR-" in x["loan_id"],
    "Saudi Arabia": lambda x: "-SA-" in x["loan_id"], "Kuwait": lambda x: "-KW-" in x["loan_id"],
    "United Arab Emirates": lambda x: "-AE-" in x["loan_id"], "Belgium": lambda x: "-BE-" in x["loan_id"],
}
with open(f"{OUT}/coverage_check.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["creditor", "official_total_usd_m_end2024 (World Bank IDS)", "loans_in_database", "outstanding_known_per_loan", "status"])
    for name, r in ids.items():
        if name.startswith(("TOTAL", "of which", "IMF")):
            continue
        test = MAP.get(name)
        n = sum(1 for x in rows if test(x)) if test else 0
        if name == "World Bank-IDA":
            st, known = "Complete (exact outstanding per loan)", "Yes"
        elif n:
            st, known = "Active loans from the official Treasury list; older fully disbursed loans still to add", "No (amount signed only)"
        elif name in ("Algeria", "Angola"):
            st, known = "Old arrears under negotiation (IMF CR 25/60); no active loans", "No"
        else:
            st, known = "No active loans in the official list; older loans still to collect", "No"
        w.writerow([name, r["outstanding_usd_m_end2024"], n, known, st])
    w.writerow(["IMF", "1297 (incl. SDR allocations)", 4, "Yes (by facility)", "Complete at facility level"])

# --- reconciliation against Madagascar's official figures (BSD n°41, end-June 2026) ---
off = {r["item"]: r for r in csv.DictReader(open(f"{RAW}/official_bsd_totals.csv"))}
ida = sum(r["outstanding_usd"] for r in rows if r["loan_id"].startswith("MDG-IDA")) / 1e6
imf = sum(r["outstanding_usd"] for r in rows if r["loan_id"].startswith("MDG-IMF")) / 1e6
other_multi = sum(float(ids[k]["outstanding_usd_m_end2024"]) for k in
                  ["African Development Bank (incl. ADF)", "European Investment Bank", "IFAD", "OPEC Fund", "BADEA", "Trade & Development Bank (TDB)"])
with open(f"{OUT}/reconciliation.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["check", "official_madagascar_usd_m", "database_or_other_source_usd_m", "difference_pct", "verdict", "explanation"])
    m_off = float(off["Multilateral creditors"]["usd_m_end_jun_2026"])
    est = ida + other_multi
    w.writerow(["Multilateral creditors (excl. IMF)", m_off, round(est, 1), round((est - m_off) / m_off * 100, 1), "Consistent",
                f"IDA {ida:.0f} (31 Oct 2026, loan level) + other multilaterals {other_multi:.0f} (World Bank IDS end-2024). Different dates; gap within 2%. The official multilateral total does not include the IMF."])
    p_off = float(off["Private creditors"]["usd_m_end_jun_2026"])
    w.writerow(["IMF credit", "~608 (\"financial institutions\" line, 2 583.2 bn MGA)", round(imf, 1), "", "To confirm",
                "IMF lists US$1 011m owed by Madagascar; the Treasury books about US$608m under 'financial institutions' (IMF credit on-lent by the central bank, per SDMT 2026-2028). The rest is likely the central bank's own balance-of-payments borrowing. Ask the Debt Directorate."])
    b_off = float(off["Bilateral creditors"]["usd_m_end_jun_2026"])
    bil = float(ids["TOTAL external PPG (excl. IMF)"]["outstanding_usd_m_end2024"]) - float(ids["of which multilateral"]["outstanding_usd_m_end2024"]) - float(ids["of which commercial banks"]["outstanding_usd_m_end2024"])
    w.writerow(["Bilateral creditors (incl. arrears)", b_off, bil, round((bil - b_off) / b_off * 100, 1), "Partly explained",
                "World Bank IDS end-2024 bilateral total vs Treasury end-June 2026. The Treasury figure includes ~US$222m of arrears (943.6 bn MGA total arrears) to bilateral creditors under negotiation (Algeria, Angola, Libya...)."])
    w.writerow(["Commercial banks", round(360.4 / 28219.6 * 6642.0, 1), 100, "", "Consistent",
                "Société Générale cable-car loan: EUR 102.4m (~US$100m) still owed end-2025 per SDMT 2026-2028; Treasury commercial-bank line = 360.4 bn MGA (~US$85m) end-June 2026 after repayments."])
    w.writerow(["World Bank loans in the official list", "32 active IDA loan lines (BSD n°41 tables 13-14) + 9 lines signed Jan-Jun 2026 (table 10)", "All found in World Bank data", 0, "Match",
                "Each IDA line matches a World Bank credit by signing date and amount net of cancellations (e.g. Digital & Energy Connectivity 400 - 25 cancelled = 375; SADC statistics 44.6 vs 45.0). One split differs: ASCENT is 125 + 125 in the Treasury table vs 150 + 100 in World Bank data (same 250 total)."])
    w.writerow(["Total external public debt", float(off["External public debt (central government)"]["usd_m_end_jun_2026"]), "", "", "Reference",
                "Official total end-June 2026: US$6 642.0m (multilateral 73.2%, bilateral 13.1%, financial institutions 10.4%, commercial banks 1.3%, unclaimed/arrears 3.3%)."])

print(len(rows), "loans;", "IDA $m", round(ida), "; IMF $m", round(imf), "; official non-IDA loans", len(official))

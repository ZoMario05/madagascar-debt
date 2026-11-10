import csv, sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

OUT_DIR, XLSX = sys.argv[1], sys.argv[2]
F = "Arial"
H = Font(name=F, bold=True, color="FFFFFF"); HF = PatternFill("solid", fgColor="0F5132")
N = Font(name=F, size=10); B = Font(name=F, bold=True, size=10); BLUE = Font(name=F, size=10, color="0000FF")
wb = Workbook()

def header(ws, cols, row=1):
    for i, c in enumerate(cols, 1):
        cell = ws.cell(row=row, column=i, value=c); cell.font = H; cell.fill = HF
        cell.alignment = Alignment(wrap_text=True, vertical="center")
    ws.freeze_panes = ws.cell(row=row + 1, column=1)

# README
ws = wb.active; ws.title = "README"
lines = [
    ("Madagascar External Debt Database — master dataset v0.2", True),
    ("Data as of 31 Oct 2026 (World Bank IDA, IMF); creditor totals as of end-2024 (World Bank International Debt Statistics). Built 10 Nov 2026.", False),
    ("Scope: external public debt still owed. Grants, forgiven debt (HIPC/MDRI) and fully repaid or fully cancelled loans are excluded.", False),
    ("", False),
    ("Tabs", True),
    ("Loans — one row per loan. Every row has a source link. Amounts in US$.", False),
    ("Repayment schedule — principal due per year by creditor. IMF = official IMF projection; IDA = ESTIMATED (outstanding spread evenly to final maturity).", False),
    ("Coverage — official creditor totals vs what the database holds loan by loan; shows what is left to collect.", False),
    ("Official check — the database compared with Madagascar's own figures (Treasury Bulletin Statistique de la Dette n°41, end-June 2026).", False),
    ("Official totals — key figures copied from the Treasury bulletin n°41.", False),
    ("", False),
    ("Methods and caveats", True),
    ("World Bank IDA: 108 credits from the IDA Statement of Credits (Finances One DS00001), snapshot 31 Oct 2026. Outstanding = borrower's obligation; amounts in US$ at historical rates as published.", False),
    ("IMF: Financial Position in the Fund, 31 Oct 2026. SDR converted at US$1.3559 per SDR (IMF, 10 Nov 2026). The 2021 ECF row also holds the balance of earlier ECF arrangements (split not published).", False),
    ("Other lenders (AfDB, EIB, IFAD, OPEC Fund, BADEA, France, Japan, China, Korea, Gulf funds, Belgium, Société Générale): 65 active loans from the Treasury's official project list (BSD n°41), amount = US$ allocation as published. Outstanding per loan is not published; older, fully disbursed loans are still to add.", False),
    ("Three China loans (2007 hotel, 2018 Tsarasaotra-Ivato road, 2020 telecom) and AfDB PRIRTEM II come from AidData / AfDB press releases (confidence Medium).", False),
    ("IDA sectors are assigned by keyword from project names and must be reviewed; 6 are marked 'Other / to classify'.", False),
    ("IDA totals (Oct 2026) are higher than World Bank IDS (end-2024) because of new disbursements in 2025–26 and different valuation dates.", False),
    ("", False),
    ("Sources", True),
    ("https://financesone.worldbank.org/ida-statement-of-credits,-grants-and-guarantees-latest-available-snapshot/DS00001", False),
    ("https://www.imf.org/external/np/fin/tad/exfin2.aspx?memberKey1=620&date1key=2099-12-31", False),
    ("https://api.worldbank.org/v2/sources/6/country/MDG/series/DT.DOD.DPPG.CD/counterpart-area/all/time/YR2024?format=json", False),
    ("https://china.aiddata.org (project pages linked per loan)", False),
    ("http://www.tresorpublic.mg/?page_id=214&content=temp&type=bsd (Bulletin Statistique de la Dette n°41, June 2026; SDMT 2026-2028)", False),
]
for i, (t, b) in enumerate(lines, 1):
    c = ws.cell(row=i, column=1, value=t); c.font = Font(name=F, bold=b, size=14 if i == 1 else 10)
ws.column_dimensions["A"].width = 150

# Loans
ws = wb.create_sheet("Loans")
rows = list(csv.DictReader(open(f"{OUT_DIR}/master_loans.csv")))
cols = list(rows[0].keys()); header(ws, cols)
num = {"amount_original_usd", "outstanding_usd", "undisbursed_usd"}
for r_i, r in enumerate(rows, 2):
    for c_i, k in enumerate(cols, 1):
        v = r[k]
        if k in num and v not in ("", None):
            v = float(v); cell = ws.cell(row=r_i, column=c_i, value=v); cell.number_format = "#,##0;(#,##0);-"
        else:
            cell = ws.cell(row=r_i, column=c_i, value=v)
        cell.font = N
widths = {"loan_id": 18, "lender_name": 30, "project_name": 42, "source_urls": 50, "notes": 50}
for i, k in enumerate(cols, 1):
    ws.column_dimensions[get_column_letter(i)].width = widths.get(k, 15)
ws.auto_filter.ref = f"A1:{get_column_letter(len(cols))}{len(rows)+1}"
last = len(rows) + 1
oc = get_column_letter(cols.index("outstanding_usd") + 1); uc = get_column_letter(cols.index("undisbursed_usd") + 1)
ws.cell(row=last + 2, column=1, value="Total outstanding (US$)").font = B
ws.cell(row=last + 2, column=cols.index("outstanding_usd") + 1, value=f"=SUM({oc}2:{oc}{last})").number_format = "#,##0"
ws.cell(row=last + 3, column=1, value="Total undisbursed (US$)").font = B
ws.cell(row=last + 3, column=cols.index("undisbursed_usd") + 1, value=f"=SUM({uc}2:{uc}{last})").number_format = "#,##0"

# Repayment schedule: raw rows + summary by year with SUMIFS
ws = wb.create_sheet("Repayment schedule")
sched = list(csv.DictReader(open(f"{OUT_DIR}/repayment_schedule_estimated.csv")))
header(ws, ["creditor", "year", "principal_due_usd", "basis"])
for i, r in enumerate(sched, 2):
    ws.cell(row=i, column=1, value=r["creditor"]).font = N
    ws.cell(row=i, column=2, value=int(r["year"])).font = N
    c = ws.cell(row=i, column=3, value=float(r["principal_due_usd"])); c.font = BLUE; c.number_format = "#,##0"
    ws.cell(row=i, column=4, value=r["basis"]).font = N
n = len(sched) + 1
ws.cell(row=1, column=6, value="Year").font = B; ws.cell(row=1, column=7, value="IDA (est.) US$m").font = B
ws.cell(row=1, column=8, value="IMF US$m").font = B; ws.cell(row=1, column=9, value="Total US$m").font = B
for j, y in enumerate(range(2027, 2041), 2):
    ws.cell(row=j, column=6, value=str(y)).font = N
    for col, cred in ((7, "IDA"), (8, "IMF")):
        c = ws.cell(row=j, column=col, value=f'=SUMIFS($C$2:$C${n},$A$2:$A${n},"{cred}",$B$2:$B${n},VALUE(F{j}))/1000000')
        c.number_format = "#,##0;(#,##0);-"; c.font = N
    c = ws.cell(row=j, column=9, value=f"=G{j}+H{j}"); c.number_format = "#,##0"; c.font = N
ws.cell(row=17, column=6, value="Principal only. Bilateral, AfDB and other creditors not yet included.").font = Font(name=F, italic=True, size=9)
for col, w in zip("ABCDFGHI", (10, 8, 16, 60, 8, 16, 12, 12)):
    ws.column_dimensions[col].width = w

# Coverage
ws = wb.create_sheet("Coverage")
cov = list(csv.reader(open(f"{OUT_DIR}/coverage_check.csv")))
header(ws, cov[0])
for i, r in enumerate(cov[1:], 2):
    for j, v in enumerate(r, 1):
        if j == 2 and v and v.replace(".", "").isdigit():
            c = ws.cell(row=i, column=j, value=float(v)); c.number_format = "#,##0"
        elif j == 3 and v.isdigit():
            c = ws.cell(row=i, column=j, value=int(v))
        else:
            c = ws.cell(row=i, column=j, value=v)
        c.font = N
end = len(cov)
ws.cell(row=end + 2, column=1, value="Official external PPG debt excl. IMF, end-2024 (US$m)").font = B
c = ws.cell(row=end + 2, column=2, value=4901); c.font = BLUE
ws.cell(row=end + 3, column=1, value="Share of that total held by creditors with at least one loan in the database").font = B
c = ws.cell(row=end + 3, column=2, value=f'=SUMIFS(B2:B{end},C2:C{end},">0")/B{end+2}'); c.number_format = "0.0%"
ws.cell(row=end + 4, column=1, value="Source: World Bank International Debt Statistics, DT.DOD.DPPG.CD (updated 5 Nov 2026)").font = Font(name=F, italic=True, size=9)
for col, w in zip("ABCDE", (40, 22, 16, 26, 70)):
    ws.column_dimensions[col].width = w

for title, fname, widths2 in (("Official check", "reconciliation.csv", (34, 30, 26, 14, 16, 110)),):
    ws = wb.create_sheet(title); data = list(csv.reader(open(f"{OUT_DIR}/{fname}"))); header(ws, data[0])
    for i, r in enumerate(data[1:], 2):
        for j, v in enumerate(r, 1):
            c = ws.cell(row=i, column=j, value=v); c.font = N; c.alignment = Alignment(wrap_text=True, vertical="top")
    for j, wdt in enumerate(widths2, 1):
        ws.column_dimensions[get_column_letter(j)].width = wdt
ws = wb.create_sheet("Official totals")
data = list(csv.reader(open(sys.argv[3])))
header(ws, data[0])
for i, r in enumerate(data[1:], 2):
    for j, v in enumerate(r, 1):
        try:
            c = ws.cell(row=i, column=j, value=float(v)) if j in (2, 3, 4, 5) and v else ws.cell(row=i, column=j, value=v)
            if j in (2, 3, 4, 5) and v: c.number_format = "#,##0.0"
        except ValueError:
            c = ws.cell(row=i, column=j, value=v)
        c.font = N
for j, wdt in enumerate((52, 18, 18, 18, 18, 60), 1):
    ws.column_dimensions[get_column_letter(j)].width = wdt
wb.save(XLSX)

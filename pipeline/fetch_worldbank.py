"""World Bank: every IDA credit to Madagascar (Finances One, dataset DS00001, monthly)
and creditor totals from International Debt Statistics (yearly).
Writes data/raw/wb_ida.csv and data/raw/wb_ids_creditors.csv."""
import json, datetime as dt, urllib.parse
from common import get, write_csv, update_asof

FONE = ("https://datacatalogapi.worldbank.org/dexapps/fone/api/apiservice?datasetId=DS00001&resourceId=RS00001"
        "&type=json&top=1000&skip={skip}&filter=" + urllib.parse.quote("country='Madagascar'"))


def ida():
    rows, skip = [], 0
    while True:
        j = json.loads(get(FONE.format(skip=skip)))
        rows += j["data"]
        skip += 1000
        if skip >= j.get("count", 0) or not j["data"]:
            break
    keep = [d for d in rows
            if not d["credit_number"].startswith(("IDAD", "IDAH", "IDAE", "IDAB", "IDAG"))      # grants & guarantees
            and d["credit_status"] not in ("Fully Repaid", "Fully Cancelled")                    # repaid / cancelled
            and ((d.get("borrowers_obligation_us_") or 0) > 0 or (d.get("undisbursed_amount_us_") or 0) > 0)]
    R = lambda v: round(v or 0)
    out = [[d["credit_number"], d["project_id"], (d["project_name"] or "").replace(",", " ").strip(), d["credit_status"],
            d["currency_of_commitment"], d["board_approval_date"], d.get("agreement_signing_date") or "",
            R(d["original_principal_amount_us_"]), R(d["cancelled_amount_us_"]), R(d["disbursed_amount_us_"]),
            R(d["undisbursed_amount_us_"]), R(d["repaid_to_ida_us_"]), R(d["borrowers_obligation_us_"]),
            d["service_charge_rate"], d.get("first_repayment_date") or "", d.get("last_repayment_date") or ""] for d in keep]
    out.sort(key=lambda r: r[0])
    write_csv("wb_ida.csv", ["credit_number", "project_id", "project_name", "credit_status", "currency", "board_approval_date",
                             "agreement_signing_date", "original_principal_usd", "cancelled_usd", "disbursed_usd", "undisbursed_usd",
                             "repaid_usd", "outstanding_usd", "service_charge_rate", "first_repayment_date", "last_repayment_date"], out)
    eop = dt.datetime.strptime(rows[0]["end_of_period"], "%d-%b-%Y").date().isoformat()
    update_asof(wb=eop)
    print(f"IDA: {len(out)} credits, outstanding ${sum(r[12] for r in out)/1e6:,.0f}m (as of {eop})")


IDS = "https://api.worldbank.org/v2/sources/6/country/MDG/series/{s}/counterpart-area/{c}/time/{t}?format=json&per_page=500"
TYPES = {"World Bank-IDA": "Multilateral", "African Dev. Bank": "Multilateral", "European Investment Bank": "Multilateral",
         "International Fund for Agricultural Dev.": "Multilateral", "OPEC Fund for International Dev.": "Multilateral",
         "Arab Bank for Economic Dev. in Africa (BADEA)": "Multilateral", "Eastern & Southern African Trade & Dev. Bank (TDB)": "Multilateral"}
RENAME = {"African Dev. Bank": "African Development Bank (incl. ADF)", "International Fund for Agricultural Dev.": "IFAD",
          "OPEC Fund for International Dev.": "OPEC Fund", "Arab Bank for Economic Dev. in Africa (BADEA)": "BADEA",
          "Eastern & Southern African Trade & Dev. Bank (TDB)": "Trade & Development Bank (TDB)", "Korea, Republic of": "Korea",
          "Germany, Fed. Rep. of": "Germany"}


def ids():
    year = dt.date.today().year - 1
    for y in (year, year - 1):  # latest year published
        j = json.loads(get(IDS.format(s="DT.DOD.DPPG.CD", c="all", t=f"YR{y}")))
        data = (j.get("source") or {}).get("data") or []
        vals = [(next(v["value"] for v in r["variable"] if "ounterpart" in v["concept"]), r["value"]) for r in data if r["value"]]
        if vals:
            break
    rows = []
    for name, v in sorted(vals, key=lambda x: -x[1]):
        name = name.strip()
        if name == "World":
            continue
        rows.append([RENAME.get(name, name), round(v / 1e6), TYPES.get(name, "Bilateral"), f"World Bank IDS DT.DOD.DPPG.CD YR{y}"])

    def tot(series):
        j = json.loads(get(IDS.format(s=series, c="WLD", t=f"YR{y}")))
        d = (j.get("source") or {}).get("data") or [{}]
        return round((d[0].get("value") or 0) / 1e6)
    rows += [["TOTAL external PPG (excl. IMF)", tot("DT.DOD.DPPG.CD"), "", "DT.DOD.DPPG.CD"],
             ["of which multilateral", tot("DT.DOD.MLAT.CD"), "", "DT.DOD.MLAT.CD"],
             ["of which bilateral", tot("DT.DOD.BLAT.CD"), "", "DT.DOD.BLAT.CD"],
             ["of which commercial banks", tot("DT.DOD.PCBK.CD"), "", "DT.DOD.PCBK.CD"],
             ["IMF credit (use of IMF credit incl. SDR allocations)", tot("DT.DOD.DIMF.CD"), "", "DT.DOD.DIMF.CD"]]
    write_csv("wb_ids_creditors.csv", ["creditor", "outstanding_usd_m_end2024", "creditor_type", "source"], rows)
    update_asof(ids=f"{y}-12-31")
    print(f"IDS {y}: {len(rows)-5} creditors")


if __name__ == "__main__":
    ida()
    ids()

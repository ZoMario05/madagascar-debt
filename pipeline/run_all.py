"""Run the whole update: fetch every source, rebuild the dataset, the workbook and the website.
A source that fails keeps its last good file, so the site never breaks.
Usage: python pipeline/run_all.py [--only news]"""
import subprocess, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
only = sys.argv[sys.argv.index("--only") + 1].split(",") if "--only" in sys.argv else None
FETCH = {"worldbank": "fetch_worldbank.py", "imf": "fetch_imf.py", "bsd": "fetch_bsd.py", "news": "fetch_news.py"}

failed = []
for name, script in FETCH.items():
    if only and name not in only:
        continue
    r = subprocess.run([sys.executable, script], cwd=HERE)
    if r.returncode:
        failed.append(name)

steps = [["build_master.py", "data/raw", "data/out"],
         ["build_site_data.py", "data/raw", "data/out"],
         ["build_xlsx.py", "data/out", "public/trosa_base.xlsx", "data/raw/official_bsd_totals.csv"],
         ["assemble_site.py"]]
os.makedirs(os.path.join(ROOT, "public"), exist_ok=True)
for s in steps:
    subprocess.run([sys.executable, os.path.join("pipeline", s[0])] + s[1:], cwd=ROOT, check=True)
# public download files (names are linked from the site's "Données" section)
PUBLISH = {"data/out/master_loans.csv": "trosa_prets.csv", "data/out/repayment_schedule_estimated.csv": "trosa_echeancier.csv",
           "data/out/reconciliation.csv": "trosa_controle_officiel.csv", "data/out/coverage_check.csv": "trosa_couverture.csv",
           "data/out/site_data.json": "trosa_donnees.json", "site/data_dictionary.csv": "trosa_dictionnaire.csv"}
for f in os.listdir(os.path.join(ROOT, "public")):
    if f.endswith((".csv", ".json", ".xlsx")) and f not in PUBLISH.values() and f != "trosa_base.xlsx":
        os.remove(os.path.join(ROOT, "public", f))   # remove old file names
for src, dst in PUBLISH.items():
    if os.path.exists(os.path.join(ROOT, src)):
        open(os.path.join(ROOT, "public", dst), "wb").write(open(os.path.join(ROOT, src), "rb").read())
print("done; failed sources:", failed or "none")
sys.exit(1 if failed and len(failed) == len(only or FETCH) else 0)

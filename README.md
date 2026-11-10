# Dette extérieure de Madagascar — base de données et site

Qui prête à Madagascar, pour quoi, à quelles conditions, et quand il faut rembourser.
*Who lends to Madagascar, for what, on what terms, and when it comes due.*

Version 0.2 · 182 prêts · données au 31 oct. 2026 (Banque mondiale, FMI) et 30 juin 2026 (Trésor).

## Ce qui se met à jour tout seul

| Source | Quoi | Fréquence | Script |
| --- | --- | --- | --- |
| Banque mondiale — Finances One (DS00001) | Chaque crédit IDA : montant, encours, échéances | chaque mois (le 12) | `pipeline/fetch_worldbank.py` |
| Banque mondiale — International Debt Statistics | Encours par créancier | chaque année (même script) | `pipeline/fetch_worldbank.py` |
| FMI — Position financière (Madagascar) | Encours par facilité, remboursements prévus, taux DTS/US$ | chaque mois | `pipeline/fetch_imf.py` |
| Trésor public — Bulletin Statistique de la Dette | Totaux officiels; nouveaux prêts signés | vérifié chaque mois, publié chaque trimestre | `pipeline/fetch_bsd.py` |
| Google News (FR + EN) | Actualités sur la dette de Madagascar | chaque jour | `pipeline/fetch_news.py` |

Si une source ne répond pas, le dernier fichier valide est gardé : le site ne casse jamais.

**Une seule étape manuelle :** quand un nouveau bulletin du Trésor sort, les totaux sont mis à jour automatiquement, et une *issue* GitHub « Nouveau bulletin du Trésor à vérifier » s'ouvre avec la liste des choses à vérifier (environ 15 minutes) : nouveaux prêts à ajouter dans `data/raw/official_bsd_loans.csv` et ratios dans `data/raw/official.json`. Le tableau des projets du bulletin change de mise en page d'un numéro à l'autre, donc une relecture humaine reste la règle — c'est aussi ce qui rend la base crédible.

## Mise en ligne (une fois, 20 minutes)

1. Créez un dépôt GitHub (public ou privé) et envoyez-y ce dossier.
2. Dans le dépôt : **Settings → Pages → Source : GitHub Actions**.
3. **Actions → Update data and site → Run workflow** pour la première mise à jour.
4. Le site est publié à `https://<votre-compte>.github.io/<dépôt>/`. Un nom de domaine (ex. `trosa.mg`) se branche dans Settings → Pages → Custom domain.

Alternative : Cloudflare Pages (gratuit, rapide en Afrique) en pointant sur le dossier `public/` généré.

## Lancer à la main

```bash
pip install openpyxl pdfplumber
python pipeline/run_all.py              # tout récupérer et reconstruire
python pipeline/run_all.py --only news  # seulement les actualités
python pipeline/run_all.py --only none  # reconstruire sans rien télécharger (après une modification à la main)
```

Résultats dans `public/` : `index.html` (le site), `Madagascar_External_Debt_Database.xlsx`, et les CSV en données ouvertes.

## Organisation

```
data/raw/        sources brutes (versionnées : chaque mise à jour est un commit daté)
  wb_ida.csv               crédits IDA (automatique)
  wb_ids_creditors.csv     encours par créancier (automatique)
  imf.csv, imf_projected.csv, sdr_usd.txt   FMI (automatique)
  official.json            chiffres du bulletin du Trésor (totaux automatiques, ratios à la main)
  official_bsd_loans.csv   prêts des autres créanciers (liste officielle du Trésor, à la main)
  other_loans_manual.csv   prêts issus d'AidData / communiqués (à la main)
  news.csv                 actualités (automatique)
pipeline/        scripts de récupération et de construction
site/            modèle du site (template.html) et code du globe
public/          ce qui est publié (généré)
```

## Règles de crédibilité

Pas de source, pas de ligne. Les estimations sont signalées (barres hachurées). Les totaux sont comparés aux chiffres officiels du Trésor (onglet « Official check » du classeur). Langage neutre. Licence des données : CC BY 4.0.

## Note technique

Les scripts de récupération ont été écrits et testés sur les formats publiés en novembre 2026 ; la reconstruction hors ligne (`--only none`) est testée. Faites un premier « Run workflow » et vérifiez le journal : si un site a changé son format, seul ce script est à ajuster.

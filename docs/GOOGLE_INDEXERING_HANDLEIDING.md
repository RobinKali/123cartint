# Handleiding Google Search Console & Indexering (123cartint.nl)

Deze handleiding beschrijft stap-voor-stap hoe u de website **123cartint.nl** aanmeldt, verifieert en optimaal laat indexeren door Google zodra de site live staat op het hoofddomein (via Cloud86 met de domeinnaam bij Strato).

---

## 1. Voorbereiding & Technische status

De website is al technisch geoptimaliseerd volgens de richtlijnen van Google:
- **XML Sitemap:** Automatisch gegenereerd op `https://123cartint.nl/sitemap-index.xml`
- **Robots.txt:** Aanwezig op `https://123cartint.nl/robots.txt` met directe verwijzing naar de sitemap.
- **Canonical URLs:** Elke pagina bevat een unieke `<link rel="canonical" href="...">`.
- **Meta Tags & Social Sharing:** Elke pagina beschikt over unieke title tags, meta descriptions, Open Graph en Twitter Cards.
- **Schema.org Structured Data:** `AutoRepair` / `LocalBusiness` JSON-LD data is ingebed met adres (**Veilingstraat 1, Enschede**), openingstijden, reviewscore (5.0 sterren) en contactgegevens.
- **Favicons:** Voldoet aan Googlebot-Favicon specificaties (inclusief 96x96px, 180x180px apple-touch, SVG en ICO).

---

## 2. Stap 1: Aanmelden bij Google Search Console

1. Ga naar [Google Search Console](https://search.google.com/search-console).
2. Log in met uw Google-account (bij voorkeur hetzelfde account waarmee ook het **Google Bedrijfsprofiel** wordt beheerd).
3. Klik linksboven op **+ Property toevoegen**.
4. Kies in de popup voor het linker type: **Domein** (niet URL-voorvoegsel):
   - Voer in: `123cartint.nl` (zonder `https://` of `www.`).
   - Klik op **Doorgaan**.
   *(Met een domein-property worden zowel `123cartint.nl`, `www.123cartint.nl`, `http` als `https` in één keer gemonitord).*

---

## 3. Stap 2: Domeinverificatie via Strato DNS (TXT-record)

Na stap 1 toont Google Search Console een **TXT-record** (bijvoorbeeld: `google-site-verification=abcdef123456...`).

1. Log in op uw [Strato Klantenpaneel](https://www.strato.nl/).
2. Ga naar uw **Domeinbeheer** en selecteer het domein `123cartint.nl`.
3. Klik op **DNS-beheer** of **DNS-instellingen**.
4. Zoek het onderdeel **TXT-records** (of **TXT en CNAME-records**).
5. Voeg een nieuw TXT-record toe:
   - **Naam / Host:** `@` (of laat leeg indien Strato dit aangeeft)
   - **Type:** `TXT`
   - **Waarde / Doel:** Plak hier de volledige verificatietekst van Google (`google-site-verification=...`)
   - **TTL:** Standaard (bijv. 3600 of Auto)
6. Sla de instellingen op.
7. Ga terug naar Google Search Console en klik op **Verifiëren**.
   > *Let op: Het kan tussen 5 minuten en enkele uren duren voordat DNS-wijzigingen wereldwijd actief zijn. Als Google het niet direct ziet, wacht een half uurtje en klik opnieuw op Verifiëren.*

---

## 4. Stap 3: XML Sitemap Indienen

Zodra het eigendom is geverifieerd:
1. Klik in het linkermenu van Search Console op **Sitemaps** (onder "Indexering").
2. Bij **Nieuwe sitemap toevoegen** ziet u `https://123cartint.nl/`.
3. Vul daarachter in: `sitemap-index.xml`
4. Klik op **Verzenden**.
5. De status verandert na korte tijd in **Geslaagd** (groen). Google leest nu direct alle 9 pagina's in.

---

## 5. Stap 4: Directe URL-Inspectie & Indexering Aanvragen

Om het proces te versnellen hoeft u niet te wachten tot de crawler vanzelf langskomt:
1. Plak bovenin de zoekbalk van Search Console: `https://123cartint.nl/` en druk op Enter.
2. Klik op de knop **Indexering aanvragen**.
3. Doe dit eventueel ook voor de belangrijkste dienstenpagina's:
   - `https://123cartint.nl/tinten/`
   - `https://123cartint.nl/wrappen/`
   - `https://123cartint.nl/de-chrome/`
   - `https://123cartint.nl/detailing/`
   - `https://123cartint.nl/prijzen/`
   - `https://123cartint.nl/portfolio/`

---

## 6. Stap 5: Favicon controle & weergave in Google zoekresultaten

Google hanteert specifieke eisen voor de weergave van het bedrijfsicoontje (favicon) naast de zoekresultaten op desktop en mobiel:

1. **Specificaties (reeds geïmplementeerd):**
   - Googlebot-Favicon vereist een favicon met afmetingen die een veelvoud zijn van 48px (zoals 48x48, 96x96, 144x144, 192x192).
   - In `Layout.astro` staat:
     ```html
     <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     <link rel="shortcut icon" href="/favicon.ico" />
     ```
2. **Doorlooptijd Googlebot-Favicon:**
   - Google crawlt het favicon met een aparte crawler (`Googlebot-Image` / `Googlebot-Favicon`).
   - Het duurt gemiddeld **enkele dagen tot 2 weken** na de eerste pagina-indexering voordat Google het icoontje toont in de zoekresultaten.
   - Zolang het bestand `https://123cartint.nl/favicon-96x96.png` bereikbaar is met HTTP status 200 en niet geblokkeerd wordt in `robots.txt`, gebeurt dit volledig automatisch.

---

## 7. Stap 6: Lokale SEO & Google Bedrijfsprofiel (Google Business Profile)

Omdat 123cartint een fysieke specialist is in Enschede met een 5.0 rating (CID `6034971144337241826`), is de koppeling met Google Maps cruciaal voor lokale vindbaarheid in Twente:

1. Log in op [Google Bedrijfsprofiel](https://business.google.com/).
2. Controleer of de website-link exact staat ingesteld op: `https://123cartint.nl`.
3. Zorg dat de categorieën overeenkomen:
   - Primaire categorie: **Autoruitenservice** of **Autobekleding en -interieur** / **Autoreparatie en -onderhoud**.
   - Secundaire categorieën: **Detailing service**, **Autoruitentintbedrijf**, **Car wrap-service**.
4. Zorg dat het adres **Veilingstraat 1, 7545 LZ Enschede** exact overeenkomt met de gestructureerde data op de website.

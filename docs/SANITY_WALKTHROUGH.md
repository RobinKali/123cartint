# 📖 Sanity CMS Handleiding — 123Cartint Portfolio

Welkom bij de handleiding voor het beheren van je portfolio via **Sanity CMS**.
Met deze opzet kun je eenvoudig foto's van je projecten (ramen tinten, car wrapping, detailing en De-Chrome) toevoegen, bewerken en verwijderen, inclusief uitsnedes en SEO-omschrijvingen.

---

## ⚡ Kerngegevens van jouw project

- **Project ID:** `lwzdyp6o`
- **Dataset:** `production`
- **Abonnement:** **Sanity Free Plan**
  - Inclusief 500.000 gratis API-aanroepen per maand
  - Inclusief 100.000 gratis geüploade assets
  - Inclusief gratis cloud-hosting van de Sanity Studio (`*.sanity.studio`)
  - Razendsnelle levering van afbeeldingen via het wereldwijde Sanity Image CDN

---

## 🛠️ Stap 1: Eenmalige CORS instelling in Sanity (Cruciaal!)

Om te zorgen dat je website veilig gegevens en afbeeldingen mag ophalen uit Sanity, moet je de URL's toevoegen aan de toegestane lijst (CORS):

1. Ga in je browser naar: **[https://www.sanity.io/manage/project/lwzdyp6o/api](https://www.sanity.io/manage/project/lwzdyp6o/api)**
2. Log in met je Sanity account (Google, GitHub of e-mail).
3. Scroll naar het onderdeel **CORS Origins** en klik op **+ Add CORS origin**.
4. Voeg de volgende domeinen toe:
   - **Voor lokaal testen:**
     - Origin: `http://localhost:4321`
     - Vink **Allow credentials** aan
     - Klik op **Save**
   - **Voor de lokale studio:**
     - Origin: `http://localhost:3333`
     - Vink **Allow credentials** aan
     - Klik op **Save**
   - **Voor je Apache testserver:**
     - Origin: de URL van je testserver (bijv. `http://test.jouwdomein.nl` of het IP/subdomein dat je gebruikt)
     - Vink **Allow credentials** aan
     - Klik op **Save**
   - **Straks bij livegang (Cloud86):**
     - Origin: `https://123cartint.nl` en `https://www.123cartint.nl` *(staat er inmiddels al in)*
     - Vink **Allow credentials** aan
     - Klik op **Save**

---

## 🖥️ Stap 2: Sanity Studio Openen

Je hebt twee manieren om de Sanity Studio (het beheerpaneel) te gebruiken:

### Optie A: Lokaal op je computer draaien
1. Open een terminal in de projectmap `c:\code\123cartint`.
2. Voer het volgende commando uit:
   ```bash
   npm run studio
   ```
3. Open je browser op **[http://localhost:3333](http://localhost:3333)**.
4. Log in met je Sanity account.

---

### Optie B: Gratis Sanity Cloud Studio (Aanbevolen!)
Sanity biedt gratis hosting voor je Studio aan. Hiermee hoef je nooit meer lokaal een server te starten en kun je vanaf elke computer, tablet of telefoon inloggen:

1. Voer eenmalig het volgende commando uit in de terminal:
   ```bash
   npm run studio:deploy
   ```
2. Sanity vraagt om een unieke naam voor je studio (bijvoorbeeld `123cartint` of `123cartint-portfolio`).
3. Na het voltooien is je Studio 24/7 gratis live op bijvoorbeeld:
   👉 **`https://123cartint.sanity.studio`**
4. Sla deze link op in je favorieten!

---

## 📸 Stap 3: Portfolio Items Toevoegen & Bewerken

In de Sanity Studio zie je links in het menu **Portfolio Item** staan:

1. **Nieuw item aanmaken:**
   - Klik op **Portfolio Item** en daarna op het potlood-icoon (Create) bovenaan.
2. **Gegevens invullen:**
   - **Title:** De naam van het project (bijv. `BMW M3 Ramen Tinten 20%` of `Audi RS6 De-Chrome Pack`).
   - **Category:** Kies één van de 4 hoofddiensten:
     - 🔘 **Tinten** (Ramen Tinten)
     - 🔘 **Wrappen** (Car Wrapping)
     - 🔘 **Detailing** (Cleaning & Detailing)
     - 🔘 **De-Chrome** (De-Chrome)
   - **Image:** Sleep een foto in het uploadvak of klik op **Upload**.
     - *Hotspot & Crop:* Klik op de afbeelding na het uploaden. Je ziet een rondje. Sleep dit rondje naar het belangrijkste punt van de foto (bijv. de getinte ramen). Sanity zorgt er dan voor dat op elk apparaat (mobiel, tablet, desktop) precies het juiste deel van de foto scherp en gecentreerd blijft.
   - **Alternative Text:** Vul een korte omschrijving in voor Google SEO en blinden/slechtzienden (bijv. `BMW M3 met 20% getinte achterruiten in Enschede bij 123Cartint`).
3. **Publiceren:**
   - Klik rechtsonder op de groene knop **Publish**.
   - Het item is nu direct opgeslagen in de Sanity productie-dataset!

---

## 🌐 Stap 4: Hoe werkt dit straks met Cloud86 & Strato?

Je gaf aan dat je domein bij **Strato** blijft en de hosting bij **Cloud86** komt. Dit is een uitstekende en voordelige combinatie:

1. **Strato (Domein & E-mail):**
   - Je domeinnaam `123cartint.nl` blijft geregistreerd bij Strato.
   - De DNS A-records en CNAME-records verwijs je naar het IP-adres van je Cloud86 hostingpakket.
   - De MX-records (voor e-mail zoals `info@123cartint.nl`) laat je gewoon bij Strato staan, zodat je zakelijke mail onaangeroerd blijft werken.
2. **Cloud86 (Webhosting):**
   - Cloud86 is snelle webhosting. De 123Cartint Astro website wordt gebouwd als statische HTML/CSS/JS (`dist/` map) die je uploadt naar de `public_html` van Cloud86.
   - In `public/.htaccess` staan al geoptimaliseerde regels voor caching, compressie en nette URL's die Cloud86 direct ondersteunt.
3. **Sanity CMS & Afbeeldingen:**
   - Alle afbeeldingen worden **niet** opgeslagen op de schijf van Cloud86, maar op het wereldwijde Image CDN van Sanity.
   - Dit houdt je hostingpakket bij Cloud86 licht en razendsnel: Sanity converteert foto's automatisch naar modern WebP-formaat en levert precies de juiste pixelgrootte per scherm.
4. **Nieuwe foto's live zetten op Cloud86:**
   - Wanneer je in Sanity een foto publiceert, haalt Astro bij elke build (`npm run build`) automatisch alle nieuwste projecten op.
   - Upload daarna simpelweg de bijgewerkte `dist/` bestanden naar Cloud86 (of koppel Git in Cloud86 als je dat ondersteunt) om de website te updaten.

---

## 💡 Handige Tips voor het Sanity Free Plan

- **Caching (`useCdn: true`):**
  In [`src/lib/sanity.ts`](file:///c:/code/123cartint/src/lib/sanity.ts) staat `useCdn: true` aan. Hierdoor worden alle queries beantwoord via Sanity's wereldwijde cache. Dit telt nauwelijks mee voor je API-limieten en laadt binnen milliseconden.
- **Fallback beveiliging:**
  Als Sanity leeg is of tijdelijk niet bereikbaar is, toont de website automatisch de representatieve voorbeeldprojecten. De website toont dus nooit een lege pagina of foutmelding.
- **Afbeeldingen formaat:**
  Je hoeft foto's niet vooraf handmatig te verkleinen; Sanity doet dit automatisch via de image URL builder (`width(1200).auto('format')`).

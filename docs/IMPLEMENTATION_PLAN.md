# Implementatieplan: 123Cartint Website Updates

Dit plan richt zich op de integratie van Google Reviews via **Featurable** (100% gratis met onbeperkte pageviews) op zowel de homepage als de 'Over Ons' pagina, inclusief de handleiding voor de handmatige configuratie. De overige openstaande taken voor livegang blijven behouden.

---

## 1. Google Reviews Integratie (Featurable)

We gebruiken de widget van **Featurable** ([featurable.com](https://featurable.com)). In tegenstelling tot Elfsight (dat limieten heeft op het aantal weergaven per maand in het gratis plan), biedt Featurable een ruim gratis plan met **onbeperkte weergaven** (unlimited page views) voor Google Reviews.

De component `GoogleReviews.astro` laadt het officiële script (`https://featurable.com/assets/bundle.js`) en het widget-element (`<div id="featurable-..." data-featurable-async></div>`). Zolang er nog geen Widget ID is geconfigureerd, toont de website automatisch een donkere, gestylede fallback-sectie met een 5.0 Google rating badge en representatieve recensies.

### Handmatige stappen voor Featurable configuratie (Door jou uit te voeren):

1. **Gratis Account Aanmaken:**
   - Ga naar [featurable.com](https://featurable.com/) en meld je gratis aan (klik op *Get Started Free*).
2. **Nieuwe Widget Aanmaken:**
   - Klik in je Featurable dashboard op **"Create Widget"**.
   - Kies voor **Google Reviews**.
3. **Bedrijf Koppelen:**
   - Zoek naar **123Cartint** (locatie Enschede) en selecteer het juiste Google Bedrijfsprofiel.
4. **Vormgeving & Stijl Instellen:**
   - Kies bij *Layout* voor **Carousel** / **Slider**.
   - Stel het thema in op **Dark Mode** en kies waar mogelijk accentkleuren die passen bij de huisstijl (`#ef4444` rood / zwart).
5. **Widget Publiceren & Code/ID Ophalen:**
   - Klik op **"Embed"** (of *Save & Embed*).
   - Featurable toont een code-snippet die er zo uitziet:
     ```html
     <script src="https://featurable.com/assets/bundle.js" defer></script>
     <div id="featurable-WIDGET_ID" data-featurable-async></div>
     ```
   - Kopieer jouw unieke **WIDGET_ID** (het deel achter `featurable-`, of de hele string `featurable-...`).
6. **ID Toevoegen aan Project:**
   - Voeg in jouw lokale `.env` (en straks bij de deployment environment variables op Netlify) de regel toe:
     ```env
     PUBLIC_FEATURABLE_WIDGET_ID="jouw-unieke-widget-id"
     ```
   - De website toont vanaf dat moment direct en automatisch jouw actuele live Google Reviews widget van Featurable!

---

## Geïmplementeerde Componenten & Pagina's

### [src/components/GoogleReviews.astro](file:///c:/code/123cartint/src/components/GoogleReviews.astro)
- Featurable script (`https://featurable.com/assets/bundle.js`) en container (`id="featurable-{ID}" data-featurable-async`).
- Maakt gebruik van `PUBLIC_FEATURABLE_WIDGET_ID` of `widgetId` prop.
- Biedt een stijlvolle dark-mode fallback zolang het ID nog niet is ingevuld.

### [src/pages/index.astro](file:///c:/code/123cartint/src/pages/index.astro)
- `<GoogleReviews />` geïmplementeerd direct boven het contactformulier (`<ContactForm />`).

### [src/pages/over-ons.astro](file:///c:/code/123cartint/src/pages/over-ons.astro)
- `<GoogleReviews />` geïmplementeerd onderaan de pagina vóór de footer.

### [.env.example](file:///c:/code/123cartint/.env.example)
- Bevat `PUBLIC_FEATURABLE_WIDGET_ID=`.

---

## 2. Nog Openstaande Taken voor Definitieve Livegang (Later uit te voeren)

### 2.1 SEO & Kwaliteitscontrole
- Handmatige controle van de `<title>` en `<meta name="description">` tags op elke pagina om er zeker van te zijn dat ze kloppen, niet te lang/kort zijn en relevante zoekwoorden bevatten.
- Controleren op ontbrekende of foutieve "alt"-teksten bij afbeeldingen.
- Check ook nog even of de favicon goed staat voor de crawler en de handmatige stappen voor indexeren op google cloud console. 

### 2.2 Sanity CMS Project Activeren
- Sanity project definitief aanmaken.
- `PUBLIC_SANITY_PROJECT_ID` toevoegen aan de productie-omgeving.
- Eerste echte projectfoto's uploaden via de Sanity Studio.

### 2.3 Domeinnaam & E-mail Koppeling (Strato + Netlify/Eigen Server)
- **A-record:** Laten verwijzen naar het Load Balancer IP van de hosting / Netlify.
- **CNAME-record:** Voor `www` laten verwijzen naar de gewenste URL.
- **MX-records:** Onaangeroerd laten zodat zakelijke e-mail via Strato blijft functioneren.
- **SSL Certificaat:** Let's Encrypt SSL-certificaat activeren.

# Walkthrough: Google Reviews (Featurable) Integratie

De Google Reviews widget is geconfigureerd voor **Featurable** ([featurable.com](https://featurable.com)), met een gratis plan inclusief **onbeperkte weergaven** (geen pageview limieten zoals bij Elfsight).

---

## 🌟 Wat is er aangepast?

### 1. `GoogleReviews.astro` Component
- Gecreëerd in `src/components/GoogleReviews.astro`.
- **Featurable integratie:** Laadt het officiële script (`https://featurable.com/assets/bundle.js`) en rendert de container `<div id="featurable-..." data-featurable-async></div>`.
- **Veilige ID formatting:** Accepteert zowel het kale ID (bijv. `abc123xyz`) als met prefix (`featurable-abc123xyz`).
- **Google Trust Badge & Fallback:** Zolang er nog geen Featurable Widget ID is ingesteld in `.env`, toont de component automatisch een stijlvolle dark-mode weergave met 5.0 Google Score en geverifieerde klantervaringen.

### 2. Homepage (`src/pages/index.astro`)
- Geplaatst direct boven het contactformulier (`<ContactForm />`).

### 3. Over Ons (`src/pages/over-ons.astro`)
- Geplaatst onderaan de pagina vóór de footer.

### 4. `.env.example`
- Bijgewerkt met `PUBLIC_FEATURABLE_WIDGET_ID=`.

---

## 🛠️ Handmatige Stappen voor het Koppelen van Featurable

1. Ga naar **[featurable.com](https://featurable.com/)** en maak een gratis account aan (*Get Started Free*).
2. Klik in het dashboard op **"Create Widget"** en kies **Google Reviews**.
3. Zoek op **123Cartint** (locatie Enschede) en selecteer het Google Bedrijfsprofiel.
4. Kies bij layout voor **Carousel / Slider**, zet het thema op **Dark Mode** en kies rode accenten passend bij de huisstijl.
5. Klik op **"Embed"** en kopieer jouw unieke Widget ID uit de code (het ID achter `id="featurable-..."`).
6. Voeg in jouw `.env` (of bij je hosting provider zoals Netlify) de regel toe:
   ```env
   PUBLIC_FEATURABLE_WIDGET_ID="jouw-unieke-widget-id"
   ```
7. De website schakelt direct en automatisch over naar de live Featurable Google Reviews widget!

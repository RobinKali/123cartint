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

---

## 🛠️ Status & Configuratie

- **Actieve Widget ID:** `80e69fc0-a2f9-432f-b51e-e14c2d3a46a0`
- **Embed Code:**
  ```html
  <div id="featurable-80e69fc0-a2f9-432f-b51e-e14c2d3a46a0" data-featurable-async></div>
  <script is:inline src="https://featurable.com/assets/bundle.js" defer charset="UTF-8"></script>
  ```
- **Koppeling:** Ingesteld als standaard in `GoogleReviews.astro` en lokaal vastgelegd in `.env`.
- **Live weergave:** Zowel op de Homepage (`/`) boven het contactformulier als op de Over Ons pagina (`/over-ons`).
- **Google Bedrijfsprofiel Link:** De link "Bekijk al onze reviews op Google Bedrijfsprofiel" verwijst nu rechtstreeks naar het geverifieerde Google profiel van 123Cartint via het numerieke Customer ID: `https://maps.google.com/?cid=6034971144337241826`.

---

## ⚡ Oplossing Navigatie & Client-Side Routing (Astro View Transitions)

### Waarom trad het probleem op?
Astro maakt gebruik van `<ClientRouter />` (View Transitions) voor Single Page Application navigatie zonder volledige herlaadbeurt van de browser. 
Bij navigatie via het menu (bijvoorbeeld van *Home* naar *Over Ons*):
1. Werd het externe script `bundle.js` niet opnieuw uitgevoerd omdat het al in het window geladen was.
2. Verving Astro de `<head>`, waardoor de door Featurable geïnjecteerde `<style data-featurable-styles>` tags verloren gingen in de nieuwe pagina. Hierdoor miste het nieuwe Shadow Root stijlen en werd de carousel niet opgebouwd.

### Hoe is dit opgelost?
In [GoogleReviews.astro](file:///c:/code/123cartint/src/components/GoogleReviews.astro) is een lifecycle-script toegevoegd dat:
1. Luistert naar `astro:before-swap` om de 23 Featurable CSS `<style>` tags te bewaren en direct in de `<head>` van de inkomende pagina te plaatsen.
2. Luistert naar `astro:page-load` (die afgaat na elke menunavigatie) en `window.initializeFeaturableWidget(container)` direct aanroept op nieuw gemounte containers.
3. Garandeert dat de Shadow Root stijlen en carousel-afmetingen (Slick resize event) direct correct worden ingesteld, zodat de widget direct en strak gerenderd wordt zonder dat een handmatige pagina-refresh nodig is.

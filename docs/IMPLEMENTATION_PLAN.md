# Implementatieplan: 123Cartint Website Updates

Dit plan richt zich op de integratie van Google Reviews via **Featurable** (100% gratis met onbeperkte pageviews) op zowel de homepage als de 'Over Ons' pagina, inclusief de handleiding voor de handmatige configuratie. De overige openstaande taken voor livegang blijven behouden.

---

## 1. Google Reviews Integratie (Featurable) - [x] VOLTOOID

- [x] **Widget Integratie**: Featurable script en container geïmplementeerd in [`src/components/GoogleReviews.astro`](file:///c:/code/123cartint/src/components/GoogleReviews.astro).
- [x] **Configuratie**: Widget ID `80e69fc0-a2f9-432f-b51e-e14c2d3a46a0` ingesteld als default en in `.env`.
- [x] **Pagina's gekoppeld**:
  - [x] **Homepage (`/`)**: Geplaatst boven het contactformulier ([`src/pages/index.astro`](file:///c:/code/123cartint/src/pages/index.astro)).
  - [x] **Over Ons (`/over-ons`)**: Geplaatst onderaan de pagina vóór de footer ([`src/pages/over-ons.astro`](file:///c:/code/123cartint/src/pages/over-ons.astro)).
- [x] **Client-Side Routing / Astro View Transitions Fix**:
  - `astro:before-swap` en `astro:page-load` handlers toegevoegd zodat reviews direct getoond worden en correct gestyled blijven bij menunavigatie zonder handmatige refresh.
- [x] **Google Bedrijfsprofiel Link**:
  - CTA-link direct gekoppeld aan 123Cartint's geverifieerde profiel via Google CID `6034971144337241826`.
- [x] **Fallback & Dark Mode**:
  - 5.0 Google badge en fallback-weergave behouden voor maximale robuustheid.
- [x] **Documentatie**:
  - `.env.example` bijgewerkt met `PUBLIC_FEATURABLE_WIDGET_ID`.

---

## 2. Nog Openstaande Taken voor Definitieve Livegang (Later uit te voeren)

### 2.1 SEO & Kwaliteitscontrole
- Handmatige controle van de `<title>` en `<meta name="description">` tags op elke pagina om er zeker van te zijn dat ze kloppen, niet te lang/kort zijn en relevante zoekwoorden bevatten.
- Controleren op ontbrekende of foutieve "alt"-teksten bij afbeeldingen.
- Check ook nog even of de favicon goed staat voor de crawler en de handmatige stappen voor indexeren op google cloud console. 

### 2.2 Sanity CMS Project Activeren - [x] VOLTOOID
- [x] Sanity project `lwzdyp6o` aangemaakt en gekoppeld in `.env` en `src/lib/sanity.ts`.
- [x] Sanity Studio v3 geconfigureerd (`sanity.config.ts`, `sanity.cli.ts`, `sanity/schemas/portfolioItem.js`).
- [x] Scripts toegevoegd aan `package.json` (`npm run studio` en `npm run studio:deploy`).
- [x] Uitgebreide handleiding geschreven in [`docs/SANITY_WALKTHROUGH.md`](file:///c:/code/123cartint/docs/SANITY_WALKTHROUGH.md) inclusief instructies voor het Sanity Free Plan, CORS configuratie, Studio gebruik en Cloud86/Strato hosting.

### 2.3 Domeinnaam & E-mail Koppeling (Strato + Netlify/Eigen Server)
- **A-record:** Laten verwijzen naar het Load Balancer IP van de hosting / Netlify.
- **CNAME-record:** Voor `www` laten verwijzen naar de gewenste URL.
- **MX-records:** Onaangeroerd laten zodat zakelijke e-mail via Strato blijft functioneren.
- **SSL Certificaat:** Let's Encrypt SSL-certificaat activeren.

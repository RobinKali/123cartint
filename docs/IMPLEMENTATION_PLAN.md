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

### 2.1 SEO, Kwaliteitscontrole & Security - [x] VOLTOOID
- [x] **Vulnerability Patches & Dependencies:**
  - `astro` geüpgraded naar `v7.2.10` (kritieke Sharp/AVIF Remote Code Execution kwetsbaarheid `GHSA-26w7-cxv4-gfx2` verholpen).
  - `npm audit fix` succesvol uitgevoerd op alle afhankelijkheden.
- [x] **Apache Security Hardening (`.htaccess`):**
  - Security headers toegevoegd: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
  - Directory indexing uitgeschakeld (`Options -Indexes`).
  - Gevoelige bestanden (`.env`, `.git`, `.htaccess`, `package.json`, etc.) strict afgeschermd.
- [x] **Contactformulier Beveiliging & Backend:**
  - Beveiligde PHP backend aangemaakt in `public/api/contact.php` met POST-only restrictie, honeypot anti-spam (`_gotcha`), input sanitatie en email validatie.
  - `ContactForm.astro` voorzien van honeypot veld, AJAX afhandeling, laadstatus en duidelijke succesmelding.
- [x] **SEO Titles & Meta Descriptions:**
  - Dubbele title-bug in `Layout.astro` verholpen.
  - Alle 10 pagina's voorzien van unieke, trefwoordrijke titles en meta descriptions (140-155 tekens) gericht op Enschede en Twente.
  - Canonical URL tags (`<link rel="canonical">`) dynamisch gekoppeld.
  - `404.astro` voorzien van `<meta name="robots" content="noindex, nofollow">`.
- [x] **Open Graph & Twitter Cards:**
  - Volledige social sharing tags geïntegreerd in `Layout.astro`.
- [x] **Schema.org Structured Data:**
  - Lokale bedrijfsdata (`AutoRepair` / `LocalBusiness`) als JSON-LD toegevoegd met adres, openingstijden, 5.0 Google score en contactgegevens.
- [x] **Alt-teksten Controle:**
  - Gecontroleerd en 100% dekkend bevonden op alle afbeeldingen.
- [x] **Favicon & Googlebot Specificaties:**
  - Voldoet aan veelvouden van 48px (o.a. `favicon-96x96.png`, SVG en Apple Touch).
- [x] **Google Search Console Handleiding:**
  - Uitgebreide instructies vastgelegd in [`docs/GOOGLE_INDEXERING_HANDLEIDING.md`](file:///c:/code/123cartint/docs/GOOGLE_INDEXERING_HANDLEIDING.md) voor Search Console, Strato DNS TXT verificatie en sitemap indienen. 

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

# Handleiding Livegang & Hosting: Cloud86 & Strato

Deze handleiding legt stap-voor-stap uit hoe u de website **123cartint.nl** live zet via **Cloud86 webhosting**, terwijl de domeinnaam en e-mail bij **Strato** geregistreerd blijven.

---

## Overzicht van de architectuur

- **Domeinnaam & E-mail beheer:** Strato (DNS & MX-records blijven hier).
- **Webhosting & Bestanden:** Cloud86 (Apache / LiteSpeed webserver).
- **CMS (Sanity Studio):** Gehost in de Sanity Cloud (`https://123cartint.sanity.studio`).
- **Media & Foto's:** Sanity Content Lake & CDN (worden direct realtime in de browser van bezoekers geladen).

---

## Stap 1: Cloud86 Hosting Voorbereiden

1. Log in op het [Cloud86 Klantenpaneel](https://mijn.cloud86.nl/) en open het **Plesk beheerpaneel** van uw webhostingpakket.
2. Zorg dat het domein `123cartint.nl` (met alias `www.123cartint.nl`) is aangemaakt in Plesk.
3. Noteer het **IP-adres van de server** (dit vindt u op het dashboard van Plesk, bijv. `185.x.x.x`).
4. **SSL / HTTPS Certificaat:**
   - Ga in Plesk naar **SSL/TLS-certificaten**.
   - Vraag een gratis **Let's Encrypt** certificaat aan (vink zowel `123cartint.nl` als `www.123cartint.nl` aan).
   - *Let op: Dit kan pas definitief geverifieerd worden zodra de DNS in Stap 2 naar Cloud86 verwijst.*

---

## Stap 2: DNS Instellen bij Strato (Zonder e-mail te verstoren)

Log in op uw [Strato Klantenpaneel](https://www.strato.nl/) en ga naar **Domeinbeheer** -> selecteer `123cartint.nl` -> **DNS-beheer**.

### Wat moet u wijzigen:
1. **A-Record (Hoofddomein):**
   - **Naam:** `@` (of hoofddomein)
   - **Type:** `A`
   - **Waarde:** Het IP-adres van Cloud86 (bijv. `185.x.x.x`)
2. **A-Record of CNAME (WWW):**
   - **Naam:** `www`
   - **Type:** `A` (of CNAME naar `123cartint.nl`)
   - **Waarde:** Het IP-adres van Cloud86

### Wat moet u ABSOLUUT NIET wijzigen:
- **MX-Records:** Blijven ongewijzigd naar de Strato mailservers wijzen. Hierdoor blijft de zakelijke e-mail van de klant (`info@123cartint.nl`) 100% ononderbroken werken via Strato webmail/Outlook.
- **TXT / SPF / DKIM records:** Blijven staan voor e-mail authenticatie.

> **Tip doorlooptijd:** DNS-wijzigingen duren gemiddeld tussen de 15 minuten en enkele uren voor wereldwijde verspreiding.

---

## Stap 3: Website Bouwen & Uploaden naar Cloud86

1. **Productieversie lokaal bouwen:**
   Open uw terminal in de projectmap en voer uit:
   ```bash
   npm run build
   ```
   Dit maakt of ververst de map `dist/` met alle statische HTML, CSS, JavaScript en afbeeldingen.

2. **Bestanden uploaden:**
   - Verbind via **SFTP** (met FileZilla / WinSCP) of gebruik **Bestandsbeheer** in het Plesk paneel van Cloud86.
   - Navigeer naar de hoofdmap van de website: `httpdocs/` (of `public_html/`).
   - Verwijder eventuele standaard indexbestanden van Plesk.
   - Upload de **gehele inhoud van de lokale `dist/` map** naar deze servermap.

3. **Belangrijke bestanden die mee moeten:**
   - `.htaccess` (bevat de caching en de Apache security headers).
   - `api/contact.php` (het PHP script voor het contactformulier).
   - `robots.txt` en de `sitemap` bestanden.

---

## Stap 4: CORS Origins Instellen bij Sanity (Cruciaal voor foto's)

Omdat de website realtime foto's ophaalt uit Sanity, moet Sanity weten dat `123cartint.nl` een vertrouwde bron is:

1. Ga naar [sanity.io/manage](https://www.sanity.io/manage) en open project **`lwzdyp6o`**.
2. Ga naar het tabblad **API** en scrol naar **CORS Origins**.
3. Klik op **Add CORS origin** en voeg toe:
   - `https://www.123cartint.nl` (vink *Allow credentials* aan).
   - `https://123cartint.nl` (vink *Allow credentials* aan).
4. Klik op **Save**.

*Zonder deze stap kan de browser de foto's op de live website niet ophalen!*

---

## Stap 5: Sanity Studio CMS voor de Klant

- De Sanity Studio staat in de cloud op: **`https://123cartint.sanity.studio`**
- De klant kan inloggen met het eigen e-mailadres dat u als **Editor** heeft uitgenodigd in het Sanity dashboard (zie project Settings -> Members).
- Wanneer de klant een nieuw portfolio-item toevoegt en op **Publish** klikt, is dit **onmiddellijk zichtbaar** op de live website zonder dat u opnieuw bestanden hoeft te uploaden of te builden.

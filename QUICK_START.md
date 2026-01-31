# Quick Start: Making Your Website Bilingual

## What You Now Have

✅ A complete bilingual system ready to use  
✅ Language switcher buttons (EN/FR) in the navigation  
✅ Persistent language selection (saved to browser)  
✅ Translation files for English and French  

## How to Use (Simple Version)

### 1. Open any HTML page you want to translate

### 2. Find text you want to make multilingual

For example, in your navigation:
```html
<span>Homepage</span>
```

### 3. Add `data-i18n` attribute with a translation key

```html
<span data-i18n="nav.homepage">Homepage</span>
```

The key format is: `section.key` (like `nav.homepage`, `footer.copyright`, etc.)

### 4. Add the English translation to `locales/en.json`

```json
{
  "nav": {
    "homepage": "Homepage"
  }
}
```

### 5. Add the French translation to `locales/fr.json`

```json
{
  "nav": {
    "homepage": "Accueil"
  }
}
```

### 6. That's it! Users can now click EN/FR to switch languages

## Complete Example

### Starting point (English only)
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Restaurant</title>
  </head>
  <body>
    <h1>Welcome to Da Elmo</h1>
    <p>Best pizza in town</p>
  </body>
</html>
```

### After adding translations
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Restaurant</title>
    <link rel="stylesheet" href="./language-switcher.css" />
  </head>
  <body>
    <!-- Language switcher -->
    <div class="language-switcher" id="language-switcher">
      <button class="language-switcher-btn active" data-lang="en">EN</button>
      <button class="language-switcher-btn" data-lang="fr">FR</button>
    </div>

    <!-- Translatable content -->
    <h1 data-i18n="home.title">Welcome to Da Elmo</h1>
    <p data-i18n="home.subtitle">Best pizza in town</p>

    <!-- Scripts at bottom -->
    <script src="./js/i18n.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const langButtons = document.querySelectorAll('.language-switcher-btn');
        langButtons.forEach(button => {
          button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            i18n.setLanguage(selectedLang);
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
          });
        });
        const currentLang = i18n.getCurrentLanguage();
        langButtons.forEach(btn => {
          if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
          }
        });
      });
    </script>
  </body>
</html>
```

### locales/en.json
```json
{
  "home": {
    "title": "Welcome to Da Elmo",
    "subtitle": "Best pizza in town"
  }
}
```

### locales/fr.json
```json
{
  "home": {
    "title": "Bienvenue chez Da Elmo",
    "subtitle": "La meilleure pizza en ville"
  }
}
```

## Translation Key Naming Tips

Use descriptive section names:
- `nav.*` - Navigation elements
- `home.*` - Homepage content
- `about.*` - About page content
- `menu.*` - Menu content
- `footer.*` - Footer content
- `common.*` - Text used everywhere
- `errors.*` - Error messages

## What Happens When User Clicks Language Button?

1. ✅ All text with `data-i18n` attributes updates instantly
2. ✅ Language choice is saved to browser (persists on reload)
3. ✅ HTML `lang` attribute updates (good for accessibility)
4. ✅ Button styling shows which language is selected

## Common Keys You'll Need

Copy these key structures to your JSON files to get started:

```json
{
  "nav": {
    "homepage": "",
    "menu": "",
    "about": "",
    "contact": ""
  },
  "common": {
    "loading": "",
    "error": "",
    "success": ""
  },
  "footer": {
    "copyright": "",
    "privacyPolicy": "",
    "termsOfService": ""
  }
}
```

## Already Translated for You

These keys are already in your translation files:

**English (en.json):**
- nav.homepage → "Homepage"
- nav.menu → "Gourmet Pizza Menu"
- nav.philosophy → "Our Philosophy"
- nav.about → "About Us"
- nav.delivery → "Delivery & Sustainability"
- common.tagline → "Gourmet Pizzeria"
- common.language → "Language"

**French (fr.json):**
- nav.homepage → "Accueil"
- nav.menu → "Menu Pizza Gourmet"
- nav.philosophy → "Notre Philosophie"
- nav.about → "À Propos de Nous"
- nav.delivery → "Livraison & Durabilité"
- common.tagline → "Pizzeria Gourmet"
- common.language → "Langue"

## Next: Update Your Pages

1. Start with `index.html` (already done! ✅)
2. Then do `about-us.html`
3. Then `gourmet-pizza-menu.html`
4. And so on...

See `PAGES_TO_UPDATE.md` for the complete list and code to copy-paste.

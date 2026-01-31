# Pages to Update for Bilingual Support

This document lists all HTML pages and what needs to be added to make them bilingual.

## Quick Checklist

For each page, add to `<head>`:
```html
<link rel="stylesheet" href="./language-switcher.css" />
```

Then add before `</body>`:
```html
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
```

## Pages to Update

### Root Level Pages
- [ ] **index.html** ✅ Already updated
- [ ] **about-us.html**
- [ ] **gourmet-pizza-menu.html**
- [ ] **philosophy.html**
- [ ] **delivery-sustainability.html**
- [ ] **culinary-philosophy-ingredients.html**
- [ ] **ingredients.html**
- [ ] **privacy.html**
- [ ] **privacy-policy.html**
- [ ] **terms.html**
- [ ] **404.html**

### Component Pages
- [ ] **components/navbar4.html**
- [ ] **components/footer.html**
- [ ] **components/navigation.html**
- [ ] **components/contact4.html**
- [ ] **components/faq1.html**
- [ ] **components/cta2.html**
- [ ] **components/content-list2.html**

## Translation Keys to Add

Add these to your `locales/en.json` and `locales/fr.json`:

```json
{
  "nav": {
    "homepage": "Homepage",
    "menu": "Gourmet Pizza Menu",
    "philosophy": "Our Philosophy",
    "about": "About Us",
    "delivery": "Delivery & Sustainability"
  },
  "common": {
    "tagline": "Gourmet Pizzeria",
    "language": "Language",
    "deliveredTagline": "Gourmet Pizza, Delivered."
  },
  "footer": {
    "copyright": "2025 Da Elmo Gourmet Pizzeria Inc. All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service"
  },
  "errors": {
    "pageNotFound": "Page Not Found",
    "notFound": "404"
  }
}
```

## Example: Converting about-us.html

1. Find the title/heading and wrap text:
```html
<!-- Before -->
<h1>About Da Elmo Pizzeria</h1>

<!-- After -->
<h1 data-i18n="about.title">About Da Elmo Pizzeria</h1>
```

2. Repeat for all other text elements:
```html
<p data-i18n="about.description">Our story and values...</p>
<button data-i18n="about.cta">Get Started</button>
```

3. Add to locales/en.json:
```json
{
  "about": {
    "title": "About Da Elmo Pizzeria",
    "description": "Our story and values...",
    "cta": "Get Started"
  }
}
```

4. Add to locales/fr.json:
```json
{
  "about": {
    "title": "À Propos de Da Elmo Pizzeria",
    "description": "Notre histoire et nos valeurs...",
    "cta": "Commencer"
  }
}
```

## Testing

After updating a page:
1. Open it in a browser
2. Click EN/FR button
3. Verify all text changes
4. Check localStorage persists selection when reloading
5. Verify the page works in both languages

## Notes

- The language switcher appears in the top navigation
- Selection is saved automatically to localStorage
- All pages using the same translation keys will switch together
- You can add new keys anytime - just add them to the JSON files

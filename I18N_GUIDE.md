# Bilingual Website Implementation Guide

## What's Been Done

Your website now has a complete internationalization (i18n) system set up. Here's what was created:

### Files Created:
1. **`js/i18n.js`** - The i18n system that manages language switching
2. **`locales/en.json`** - English translations
3. **`locales/fr.json`** - French translations  
4. **`language-switcher.css`** - Styling for language switcher buttons
5. **Updated `index.html`** - Added language switcher and scripts

## How to Use the System

### Adding Translations to Any HTML Element

To make any text translatable, use the `data-i18n` attribute:

```html
<!-- Before (English only) -->
<span>Homepage</span>

<!-- After (Translatable) -->
<span data-i18n="nav.homepage">Homepage</span>
```

The text inside the element is the English fallback. The value of `data-i18n` is a dot-separated path into the translation JSON file.

### Translation File Structure

Edit `locales/en.json` and `locales/fr.json` to add/update translations:

```json
{
  "section": {
    "key": "English text",
    "anotherKey": "More text"
  }
}
```

### Example: Adding a New Translation

1. Add to `locales/en.json`:
```json
{
  "nav": {
    "homepage": "Homepage",
    "contact": "Contact Us"  // NEW
  }
}
```

2. Add to `locales/fr.json`:
```json
{
  "nav": {
    "homepage": "Accueil",
    "contact": "Nous Contacter"  // NEW
  }
}
```

3. Update your HTML:
```html
<a href="contact.html">
  <span data-i18n="nav.contact">Contact Us</span>
</a>
```

## Converting Existing Pages

To make your existing pages bilingual, follow these steps for each HTML file:

### Step 1: Add the language switcher CSS to `<head>`
```html
<link rel="stylesheet" href="./language-switcher.css" />
```

### Step 2: Add the language switcher HTML (in your navigation)
```html
<div class="language-switcher" id="language-switcher">
  <button class="language-switcher-btn active" data-lang="en">EN</button>
  <button class="language-switcher-btn" data-lang="fr">FR</button>
</div>
```

### Step 3: Add scripts before closing `</body>`
```html
<script src="./js/i18n.js"></script>
<script>
  // Language switcher functionality
  document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.language-switcher-btn');
    langButtons.forEach(button => {
      button.addEventListener('click', function() {
        const selectedLang = this.getAttribute('data-lang');
        i18n.setLanguage(selectedLang);
        
        // Update active button
        langButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Set initial active button
    const currentLang = i18n.getCurrentLanguage();
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === currentLang) {
        btn.classList.add('active');
      }
    });
  });
</script>
```

### Step 4: Convert HTML text to use `data-i18n`

Replace hardcoded text with translatable attributes:

```html
<!-- Navigation links -->
<span data-i18n="nav.homepage">Homepage</span>
<span data-i18n="nav.menu">Gourmet Pizza Menu</span>
<span data-i18n="nav.philosophy">Our Philosophy</span>
<span data-i18n="nav.about">About Us</span>
<span data-i18n="nav.delivery">Delivery & Sustainability</span>

<!-- Footer -->
<span data-i18n="common.tagline">Gourmet Pizzeria</span>
```

## How It Works

1. **Language Storage**: The selected language is saved in localStorage, so it persists across page visits
2. **Automatic Loading**: When the page loads, the i18n system:
   - Loads translation files from `locales/` folder
   - Applies the last selected language (or defaults to 'en')
   - Updates the HTML lang attribute
3. **Dynamic Updates**: When a user clicks a language button:
   - The language is switched immediately
   - All `data-i18n` elements are updated
   - The selection is saved for future visits

## Current Translations Available

You have the following translation keys already set up:
- `nav.homepage`
- `nav.menu`
- `nav.philosophy`
- `nav.about`
- `nav.delivery`
- `common.tagline`
- `common.language`

## Next Steps

1. **Add more translations** - Expand `locales/en.json` and `locales/fr.json` with all your page content
2. **Apply to all pages** - Follow the conversion steps above for each HTML file
3. **Test thoroughly** - Click the EN/FR buttons and verify all text translates correctly
4. **Add more languages** - Simply create new JSON files (e.g., `locales/es.json`) and add buttons for them

## Browser Support

This system works in all modern browsers that support:
- ES6 JavaScript (classes, async/await)
- localStorage API
- Fetch API

## Troubleshooting

**Text not translating?**
- Ensure the `data-i18n` value matches the translation key exactly
- Check browser console for errors
- Verify JSON files are valid JSON

**Language not persisting?**
- Clear browser cache/localStorage
- Check if localStorage is enabled

**Pages not loading translations?**
- Make sure you added both the CSS and JS script tags
- Verify the file paths are correct relative to your HTML file location

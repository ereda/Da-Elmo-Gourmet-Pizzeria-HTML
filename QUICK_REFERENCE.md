# 📇 Quick Reference Card

## File Locations

```
Your Website/
├── js/i18n.js                    ← Translation engine
├── locales/
│   ├── en.json                   ← Edit: English text
│   └── fr.json                   ← Edit: French text
├── language-switcher.css         ← Button styling
└── index.html                    ← Already updated ✓
```

## The 3-Step Process (Memorize This!)

Every translatable element follows the same pattern:

```html
<!-- Step 1: Add data-i18n attribute to HTML -->
<span data-i18n="section.key">English text</span>
```

```json
/* Step 2: Add to locales/en.json */
{
  "section": {
    "key": "English text"
  }
}
```

```json
/* Step 3: Add to locales/fr.json */
{
  "section": {
    "key": "Texte français"
  }
}
```

## Key Naming Convention

Use this pattern for consistency:
```
[section].[feature].[property]

Examples:
nav.homepage           ← Navigation
nav.menu               ← Navigation  
footer.copyright       ← Footer
home.title             ← Homepage
about.description      ← About page
menu.pizzaTitle        ← Menu item
```

## Common Keys Template

Copy this to your JSON files to get started:

```json
{
  "nav": {
    "homepage": "",
    "menu": "",
    "philosophy": "",
    "about": "",
    "delivery": ""
  },
  "common": {
    "tagline": "",
    "language": ""
  },
  "footer": {
    "copyright": "",
    "privacyPolicy": "",
    "termsOfService": ""
  },
  "home": {
    "title": "",
    "subtitle": ""
  }
}
```

## Code Snippets

### Add language switcher to page
```html
<div class="language-switcher" id="language-switcher">
  <button class="language-switcher-btn active" data-lang="en">EN</button>
  <button class="language-switcher-btn" data-lang="fr">FR</button>
</div>
```

### Add CSS link to `<head>`
```html
<link rel="stylesheet" href="./language-switcher.css" />
```

### Add scripts before `</body>`
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

## JSON Syntax Reminders

```json
// ✅ CORRECT
{
  "section": {
    "key": "value",
    "key2": "value2"
  }
}

// ❌ WRONG (missing comma)
{
  "section": {
    "key": "value"
    "key2": "value2"  // No comma before!
  }
}

// ❌ WRONG (trailing comma)
{
  "section": {
    "key": "value",
  }  // JSON doesn't allow trailing commas!
}
```

## Debugging Checklist

| Problem | Solution |
|---------|----------|
| Text not translating | Check `data-i18n` value matches JSON key exactly |
| Language not saving | Clear browser cache, test in private window |
| File not found error | Check file paths are relative to HTML file |
| JSON errors | Validate JSON at jsonlint.com |
| Buttons don't work | Check console (F12) for JavaScript errors |
| Styling broken | Ensure language-switcher.css is imported |

## File Editing Locations

### English translations
**File:** `locales/en.json`
```json
{
  "nav": {
    "homepage": "Homepage",
    "menu": "Gourmet Pizza Menu"
  }
}
```

### French translations  
**File:** `locales/fr.json`
```json
{
  "nav": {
    "homepage": "Accueil",
    "menu": "Menu Pizza Gourmet"
  }
}
```

### JavaScript logic (don't change unless needed)
**File:** `js/i18n.js`
- Loads translation files
- Applies translations to page
- Saves language preference
- (Already set up, no changes needed)

### Button styling
**File:** `language-switcher.css`
- Customize colors, sizes, fonts
- (Optional, works as-is)

## Already Translated Keys (Copy-Paste Ready)

These are ready to use in your HTML:

```html
<!-- Navigation -->
<span data-i18n="nav.homepage">Homepage</span>
<span data-i18n="nav.menu">Gourmet Pizza Menu</span>
<span data-i18n="nav.philosophy">Our Philosophy</span>
<span data-i18n="nav.about">About Us</span>
<span data-i18n="nav.delivery">Delivery & Sustainability</span>

<!-- Common -->
<span data-i18n="common.tagline">Gourmet Pizzeria</span>
<span data-i18n="common.language">Language</span>
```

## Documentation File Guide

| File | What it covers |
|------|---|
| START_HERE.md | 👈 Read this first! |
| README_BILINGUAL.md | Document navigation guide |
| SETUP_SUMMARY.md | System overview |
| QUICK_START.md | 3-step examples |
| VISUAL_GUIDE.md | Diagrams & flows |
| PAGES_TO_UPDATE.md | Update checklist |
| I18N_GUIDE.md | Full reference |
| (This file) | Quick lookup |

## URL Patterns

When you have other pages:
```
index.html
about-us.html
contact.html
blog/post1.html
etc...
```

Paths in different locations use:
```
<!-- In root: -->
<script src="./js/i18n.js"></script>

<!-- In subdirectory: -->
<script src="../js/i18n.js"></script>

<!-- CSS links same pattern -->
```

## Keyboard Shortcuts

| Task | How |
|------|-----|
| Find & Replace | Ctrl+H (your editor) |
| Find all instances | Ctrl+Shift+F |
| Validate JSON | Paste at jsonlint.com |
| Check console | F12 in browser |
| Hard refresh | Ctrl+Shift+R |

## Testing Checklist (Per Page)

- [ ] Language switcher visible
- [ ] Click EN - shows English text
- [ ] Click FR - shows French text
- [ ] Refresh page - language remembered
- [ ] All data-i18n elements translate
- [ ] No errors in console (F12)
- [ ] Links work in both languages
- [ ] Styling looks good

## Performance Tips

- Keep JSON files small (don't store unnecessary data)
- Use concise key names (`nav.home` not `navigation.homepage`)
- Avoid deep nesting (`nav.links.main.item` is too deep)
- Test with both languages regularly

## Browser Storage

```javascript
// Users' language choice is stored as:
localStorage.getItem('selectedLanguage')  // Returns 'en' or 'fr'

// To clear (for testing):
localStorage.clear()

// To manually set (testing):
localStorage.setItem('selectedLanguage', 'fr')
```

## Common Mistakes

❌ Typos in key names → Text doesn't translate  
❌ Missing quotes in JSON → File won't load  
❌ Trailing commas in JSON → Breaks file  
❌ Wrong file paths → Can't find scripts  
❌ Not updating both en.json AND fr.json → Partial translations  
❌ Forgetting `data-i18n` attribute → Text stays English  

## Need More Help?

- **Specific question?** → Check README_BILINGUAL.md
- **How-to?** → Read QUICK_START.md
- **Visual explanation?** → See VISUAL_GUIDE.md
- **Complete reference?** → Read I18N_GUIDE.md
- **What to do next?** → See PAGES_TO_UPDATE.md

---

**🎯 Remember:** 
1. Mark with `data-i18n` attribute
2. Add to `locales/en.json`
3. Add to `locales/fr.json`

That's it! Repeat for every text element. ✨

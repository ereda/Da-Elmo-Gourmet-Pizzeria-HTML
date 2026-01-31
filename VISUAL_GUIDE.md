# Visual Guide to the Bilingual System

## How the System Works (Visual Flow)

```
User visits website
    ↓
Browser checks localStorage for saved language
    ↓
If found: Load that language
If not: Default to English (en)
    ↓
JavaScript loads translation files (en.json, fr.json)
    ↓
Page finds all elements with data-i18n attribute
    ↓
Replaces their text with translation
    ↓
User sees translated content!
    ↓
User clicks EN/FR button
    ↓
Selected language saved to localStorage
    ↓
All data-i18n elements update instantly
    ↓
User sees new language on page refresh too
```

## File Structure

```
Your Website
│
├── index.html (UPDATED ✅)
│   ├── Imports language-switcher.css
│   ├── Imports js/i18n.js
│   └── Has EN/FR buttons in navigation
│
├── Other pages (TO UPDATE)
│   ├── about-us.html
│   ├── gourmet-pizza-menu.html
│   ├── philosophy.html
│   └── etc...
│
├── js/
│   └── i18n.js ← The translation engine
│       ├── Loads translation files
│       ├── Manages current language
│       ├── Updates page content
│       └── Saves language choice
│
├── locales/
│   ├── en.json ← English translations
│   │   {
│   │     "nav": { "homepage": "Homepage" },
│   │     "footer": { "copyright": "..." }
│   │   }
│   │
│   └── fr.json ← French translations
│       {
│         "nav": { "homepage": "Accueil" },
│         "footer": { "copyright": "..." }
│       }
│
├── language-switcher.css ← Button styling
│
└── Documentation
    ├── SETUP_SUMMARY.md ← Overview (read first!)
    ├── QUICK_START.md ← How to use it
    ├── I18N_GUIDE.md ← Full technical docs
    └── PAGES_TO_UPDATE.md ← Checklist
```

## Making Text Translatable (Step by Step)

### Original HTML
```html
<span>Welcome to Da Elmo</span>
```

### Step 1: Add data-i18n attribute
```html
<span data-i18n="home.welcome">Welcome to Da Elmo</span>
```
(The text inside is the English fallback)

### Step 2: Add to locales/en.json
```json
{
  "home": {
    "welcome": "Welcome to Da Elmo"
  }
}
```

### Step 3: Add to locales/fr.json
```json
{
  "home": {
    "welcome": "Bienvenue chez Da Elmo"
  }
}
```

### Result: Text now translates! ✨
```
English version: "Welcome to Da Elmo"
French version: "Bienvenue chez Da Elmo"
```

## Translation Key Hierarchy

```
locales/en.json
│
├── nav (Navigation section)
│   ├── homepage → "Homepage"
│   ├── menu → "Gourmet Pizza Menu"
│   ├── about → "About Us"
│   └── delivery → "Delivery & Sustainability"
│
├── common (Used everywhere)
│   ├── tagline → "Gourmet Pizzeria"
│   └── language → "Language"
│
├── home (Homepage specific)
│   ├── title → "..."
│   └── subtitle → "..."
│
├── about (About page specific)
│   ├── title → "..."
│   └── description → "..."
│
└── footer
    ├── copyright → "..."
    └── links → "..."
```

## Language Switcher Appearance

```
┌─────────────────────────────────────────────┐
│  Da Elmo Pizzeria     Navigation      [EN][FR]│  ← Buttons added here
└─────────────────────────────────────────────┘

When user clicks:
[EN] → Shows English text (button highlights)
[FR] → Shows French text (button highlights)
```

## Data Flow Diagram

```
                          localStorage
                          ↑      ↓
                    (saves selection)
                          ↓
          ┌─────────────────────────────┐
          │   i18n.js (Translation      │
          │   Engine)                   │
          └─────────────────────────────┘
                    ↓         ↓
              Reads from   Applies to
                  ↓           ↓
        ┌──────────────┐  ┌──────────────┐
        │ en.json      │  │ HTML page    │
        │ fr.json      │  │ (all data-   │
        │ es.json etc  │  │ i18n attrs)  │
        └──────────────┘  └──────────────┘
```

## What Happens on Each Page Load

### 1st Time User Visits
```
Page loads
  ↓
JavaScript checks localStorage → empty
  ↓
Defaults to English
  ↓
Loads en.json
  ↓
Translates page
  ↓
User sees English content ✓
```

### User Clicks French
```
User clicks [FR] button
  ↓
JavaScript saves "fr" to localStorage
  ↓
Loads fr.json
  ↓
Updates all data-i18n elements
  ↓
User sees French content instantly ✓
  ↓
(No page reload needed!)
```

### 2nd Time User Visits
```
Page loads
  ↓
JavaScript checks localStorage → finds "fr"
  ↓
Loads fr.json
  ↓
Translates page immediately
  ↓
User sees French content ✓
  ↓
(Language is remembered!)
```

## Translation Update Process

```
You edit locales/fr.json
        ↓
Save file
        ↓
User refreshes page or navigates
        ↓
js/i18n.js loads updated fr.json
        ↓
All affected elements update
        ↓
User sees new translations ✓
```

## Browser Compatibility

✅ Chrome/Edge/Firefox/Safari (all modern versions)
✅ Mobile browsers
✅ Works with ES6 JavaScript
✅ Uses localStorage (always available)
✅ Uses Fetch API (available in all modern browsers)

## Performance

- Translation files are **small** (JSON format)
- No external libraries needed
- Instant switching (no server calls)
- Language choice cached locally

## Security

- Translation data is public (it's text)
- No sensitive data in translation files
- Safe to view source code
- Works offline if cached

## Customization Options

### Add a 3rd Language (Spanish)
```javascript
// 1. Create locales/es.json
// 2. Add button to HTML:
<button class="language-switcher-btn" data-lang="es">ES</button>
// 3. Done! System auto-loads the file
```

### Change Button Styling
```css
/* Edit language-switcher.css */
.language-switcher-btn {
  padding: 10px 20px;  /* Make bigger */
  border-radius: 20px; /* Make rounder */
  font-weight: bold;   /* Make bolder */
}
```

### Change Default Language
```javascript
// In js/i18n.js, change line:
this.currentLanguage = this.getStoredLanguage() || 'fr'; // French default
```

## Common Patterns

### Text with HTML tags
```html
<!-- WRONG: -->
<p data-i18n="home.text"><strong>Important:</strong> Read this</p>

<!-- RIGHT: Use data attribute for plain text -->
<p><strong data-i18n="home.important">Important:</strong> 
   <span data-i18n="home.readThis">Read this</span></p>

<!-- OR: Add HTML to JSON -->
<!-- HTML: <p data-i18n="home.rich"></p> -->
<!-- JSON: "rich": "<strong>Important:</strong> Read this" -->
<!-- Then update HTML to use innerHTML instead of textContent -->
```

### Placeholders/Variables
```javascript
// In JSON: "welcome": "Welcome, {name}!"
// Need custom function to replace {name}
// (Advanced - ask if needed)
```

### Forms & Input Fields
```html
<!-- Plain text labels work: -->
<label data-i18n="form.email">Email Address</label>

<!-- Placeholders: -->
<input placeholder="Email" data-i18n-placeholder="form.emailPlaceholder">
<!-- Requires custom script to handle -->
```

## Troubleshooting Checklist

```
❌ Text not translating?
   ✓ Check data-i18n spelling matches JSON key exactly
   ✓ Verify JSON files are valid (no syntax errors)
   ✓ Check browser console for errors

❌ Language not persisting?
   ✓ Ensure localStorage is enabled
   ✓ Clear browser cache
   ✓ Test in private/incognito window

❌ Styles not applying?
   ✓ Check language-switcher.css is imported
   ✓ Verify CSS color variables exist in style.css
   ✓ Check button classes in HTML

❌ Pages not switching?
   ✓ Make sure script is added to page
   ✓ Verify relative paths to js/i18n.js
   ✓ Check data-i18n attributes exist on page
```

## Next Steps

1. **Open index.html in browser** - Test the EN/FR buttons
2. **Read QUICK_START.md** - Understand the pattern
3. **Update one page** - Follow the template from PAGES_TO_UPDATE.md
4. **Expand translations** - Add all your content to JSON files
5. **Test thoroughly** - Check both languages work perfectly

---

💡 **Tip:** Keep this guide open while working! It explains the "why" behind each step.

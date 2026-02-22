// Internationalization (i18n) System
class I18n {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || 'en';
    this.translations = {};
    this.isInitialized = false;
    this.initPromise = this.init();
    console.log('[I18n Constructor] Language set to:', this.currentLanguage);
  }

  async init() {
    console.log('i18n.init() starting...');
    // Load both language files
    const results = await Promise.all([
      this.loadLanguage('en'),
      this.loadLanguage('fr')
    ]);
    console.log('Both language files loaded.');
    console.log('Translations object keys:', Object.keys(this.translations));
    console.log('EN translations loaded:', !!this.translations['en']);
    console.log('FR translations loaded:', !!this.translations['fr']);
    
    // Apply current language
    this.applyLanguage(this.currentLanguage);
    this.isInitialized = true;
    console.log('i18n initialized with language:', this.currentLanguage);
  }

  // Return promise for initialization
  onReady() {
    return this.initPromise;
  }

  async loadLanguage(lang) {
    try {
      console.log(`Loading language file for: ${lang}`);
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.translations[lang] = data;
      console.log(`Successfully loaded ${lang}. Keys count:`, Object.keys(data).length);
      return true;
    } catch (error) {
      console.error(`Failed to load language file for ${lang}:`, error);
      return false;
    }
  }

  getStoredLanguage() {
    return localStorage.getItem('selectedLanguage');
  }

  setLanguage(lang) {
    console.log(`setLanguage() called with: ${lang}, current language: ${this.currentLanguage}`);
    console.log('[setLanguage] Translations state:', {
      en: !!this.translations['en'],
      fr: !!this.translations['fr'],
      keys: Object.keys(this.translations)
    });
    
    if (this.currentLanguage === lang) {
      console.log(`Language is already set to ${lang}. Skipping.`);
      return;
    }
    
    this.currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    console.log(`Stored language preference: ${lang}`);
    
    this.applyLanguage(lang);
    console.log(`Language switched to: ${lang}`);
  }

  applyLanguage(lang) {
    const translations = this.translations[lang] || {};
    
    if (!this.translations[lang]) {
      console.warn(`Translations for language '${lang}' not loaded. Using empty translations.`);
    }
    
    // Find all elements with data-i18n attribute
    const i18nElements = document.querySelectorAll('[data-i18n]');
    let updatedCount = 0;
    
    i18nElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = this.getText(key, translations);
      if (text) {
        element.textContent = text;
        updatedCount++;
      }
    });
    
    console.log(`Applied language '${lang}'. Updated ${updatedCount} elements out of ${i18nElements.length}.`);

    // Update language switcher button state
    this.updateLanguageSwitcherButtons(lang);

    // Update language switcher attribute
    const langSwitcher = document.getElementById('language-switcher');
    if (langSwitcher) {
      langSwitcher.setAttribute('data-current-lang', lang);
    }
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;
  }

  updateLanguageSwitcherButtons(lang) {
    const langButtons = document.querySelectorAll('.language-switcher-btn');
    console.log(`Updating ${langButtons.length} language buttons for language: ${lang}`);
    
    langButtons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
        console.log(`Added 'active' class to ${btnLang} button`);
      } else {
        btn.classList.remove('active');
        console.log(`Removed 'active' class from ${btnLang} button`);
      }
    });
  }

  getText(key, translations = null) {
    const trans = translations || this.translations[this.currentLanguage] || {};
    const keys = key.split('.');
    let value = trans;
    
    for (let k of keys) {
      value = value[k];
      if (value === undefined) return null;
    }
    
    return value;
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Initialize language switcher buttons after i18n is ready
  initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.language-switcher-btn');
    langButtons.forEach(button => {
      // Remove any existing listeners to avoid duplicates
      button.replaceWith(button.cloneNode(true));
    });
    
    // Re-query after replacing nodes
    const freshButtons = document.querySelectorAll('.language-switcher-btn');
    freshButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedLang = button.getAttribute('data-lang');
        console.log('Language button clicked:', selectedLang);
        this.setLanguage(selectedLang);
      });
    });
    
    // Set initial active button state
    this.updateLanguageSwitcherButtons(this.currentLanguage);
    console.log('Language switcher initialized. Current language:', this.currentLanguage);
  }
}

// Initialize i18n on page load
const i18n = new I18n();

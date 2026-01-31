// Internationalization (i18n) System
class I18n {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || 'en';
    this.translations = {};
    this.init();
  }

  async init() {
    // Load both language files
    await Promise.all([
      this.loadLanguage('en'),
      this.loadLanguage('fr')
    ]);
    // Apply current language
    this.applyLanguage(this.currentLanguage);
    console.log('i18n initialized with language:', this.currentLanguage);
  }

  async loadLanguage(lang) {
    try {
      const response = await fetch(`locales/${lang}.json`);
      this.translations[lang] = await response.json();
    } catch (error) {
      console.error(`Failed to load language file for ${lang}:`, error);
    }
  }

  getStoredLanguage() {
    return localStorage.getItem('selectedLanguage');
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    this.applyLanguage(lang);
    // Update HTML lang attribute
    console.log('Language changed to:', lang);
    document.documentElement.lang = lang;
  }

  applyLanguage(lang) {
    const translations = this.translations[lang] || {};
    
    // Find all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = this.getText(key, translations);
      if (text) {
        element.textContent = text;
      }
    });

    // Update language switcher button
    const langSwitcher = document.getElementById('language-switcher');
    if (langSwitcher) {
      langSwitcher.setAttribute('data-current-lang', lang);
    }
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
}

// Initialize i18n on page load
const i18n = new I18n();

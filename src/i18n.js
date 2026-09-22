import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';

/**
 * @summary Internationalization plugin of the Open Breweries DB application.
 * @remarks
 * Configured with the Composition API mode of Vue I18n. English is both the
 * default and the fallback locale, as required by the user interface
 * specification, and Spanish is offered as an alternative locale.
 * @author __AUTHOR_NAME__
 */
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, es }
});

export default i18n;

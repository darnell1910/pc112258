import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';

/**
 * Internationalization of the application. English is the default language.
 *
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

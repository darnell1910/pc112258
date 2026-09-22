import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import { Button, Card, Message, ProgressSpinner, SelectButton, Tag, Toast, ToastService, Toolbar, Tooltip } from 'primevue';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './style.css';
import App from './app.vue';
import i18n from './i18n.js';

const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY;

/**
 * @summary Composition root of the Open Breweries DB application.
 * @remarks
 * Bootstraps the Vue application, registers the internationalization plugin and
 * configures PrimeVue with the Material theme. The dark mode selector is bound
 * to a class that the application never applies, so the interface always renders
 * with the light Material palette regardless of the preference declared by the
 * operating system. Every PrimeVue component is registered globally with the
 * pv- prefix in kebab-case, so the templates stay free of library-specific
 * import statements.
 * @author __AUTHOR_NAME__
 */
createApp(App)
    .use(i18n)
    .use(PrimeVue, {
        ripple: true,
        theme: { preset: Material, options: { darkModeSelector: '.app-dark-mode' } },
        license: primeUiLicenseKey
    })
    .use(ToastService)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-message', Message)
    .component('pv-progress-spinner', ProgressSpinner)
    .component('pv-select-button', SelectButton)
    .component('pv-tag', Tag)
    .component('pv-toast', Toast)
    .component('pv-toolbar', Toolbar)
    .directive('tooltip', Tooltip)
    .mount('#app');

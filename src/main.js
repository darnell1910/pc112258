import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import { Button, Card, ProgressSpinner, SelectButton, Toast, ToastService, Toolbar, Tooltip } from 'primevue';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './style.css';
import App from './app.vue';
import i18n from './i18n.js';

const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY;

/**
 * Entry point of the application. Registers i18n and PrimeVue with the Material
 * theme, and every PrimeVue component with the pv- prefix.
 *
 * darkModeSelector points to a class that is never applied, otherwise PrimeVue
 * follows the dark mode of the operating system and the palette breaks.
 *
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
    .component('pv-progress-spinner', ProgressSpinner)
    .component('pv-select-button', SelectButton)
    .component('pv-toast', Toast)
    .component('pv-toolbar', Toolbar)
    .directive('tooltip', Tooltip)
    .mount('#app');

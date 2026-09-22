<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '@/shared/presentation/components/language-switcher.vue';
import { LogoDevApi } from '@/shared/infrastructure/logo-dev-api.js';

/**
 * @summary Toolbar displayed at the top of every screen of the application.
 * @remarks
 * Shows the brand of the application on the left, with the logo obtained from
 * the Logo.dev Logo API, and the language switcher on the right.
 * @author __AUTHOR_NAME__
 */
const { t } = useI18n();

/** @type {LogoDevApi} */
const logoApi = new LogoDevApi();

/**
 * Indicates whether the logo served by the branding provider failed to load.
 *
 * @type {import('vue').Ref<boolean>}
 */
const isLogoUnavailable = ref(false);

/**
 * URL of the application logo resolved through the Logo.dev Logo API.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const urlToLogo = computed(() =>
    logoApi.getUrlToLogoForDomain(import.meta.env.VITE_APPLICATION_LOGO_DOMAIN, 64)
);

/**
 * Records that the logo could not be displayed, so a fallback icon is shown.
 *
 * @returns {void}
 */
const onLogoError = () => {
  isLogoUnavailable.value = true;
};
</script>

<template>
  <pv-toolbar class="toolbar" :aria-label="t('application.toolbar-label')">
    <template #start>
      <div class="toolbar__brand">
        <img v-if="!isLogoUnavailable"
             class="toolbar__logo"
             :src="urlToLogo"
             :alt="t('application.logo-alt')"
             width="40"
             height="40"
             @error="onLogoError"/>
        <i v-else class="pi pi-building toolbar__logo-fallback" aria-hidden="true"></i>
        <h1 class="toolbar__title">{{ t('application.name') }}</h1>
      </div>
    </template>
    <template #end>
      <language-switcher/>
    </template>
  </pv-toolbar>
</template>

<style scoped>
.toolbar {
  border-radius: 0;
}

.toolbar__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toolbar__logo {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  border-radius: 50%;
  background-color: var(--p-surface-0, #ffffff);
}

.toolbar__logo-fallback {
  font-size: 1.75rem;
}

.toolbar__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
}

@media screen and (max-width: 575px) {
  .toolbar__title {
    font-size: 1rem;
    white-space: normal;
  }
}
</style>

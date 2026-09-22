<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '@/shared/presentation/components/language-switcher.vue';
import { LogoDevApi } from '@/shared/infrastructure/logo-dev-api.js';

/**
 * Top toolbar: logo and title on the left, language switcher on the right.
 *
 * @author __AUTHOR_NAME__
 */
const { t } = useI18n();

const logoApi = new LogoDevApi();
const urlToLogo = logoApi.getUrlToLogoForDomain(import.meta.env.VITE_APPLICATION_LOGO_DOMAIN, 64);
const logoFailed = ref(false);
</script>

<template>
  <pv-toolbar class="toolbar" :aria-label="t('application.toolbar-label')">
    <template #start>
      <div class="brand">
        <img v-if="!logoFailed"
             class="brand-logo"
             :src="urlToLogo"
             :alt="t('application.logo-alt')"
             width="40"
             height="40"
             @error="logoFailed = true"/>
        <i v-else class="pi pi-building brand-logo-placeholder" aria-hidden="true"></i>
        <h1 class="brand-title">{{ t('application.name') }}</h1>
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

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  border-radius: 50%;
  background-color: #ffffff;
}

.brand-logo-placeholder {
  font-size: 1.75rem;
}

.brand-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
}

@media screen and (max-width: 575px) {
  .brand-title {
    font-size: 1rem;
    white-space: normal;
  }
}
</style>

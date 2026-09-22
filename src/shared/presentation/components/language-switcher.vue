<script setup>
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

/**
 * Select buttons to switch the interface between English and Spanish.
 *
 * @author __AUTHOR_NAME__
 */
const { t, locale } = useI18n();

const languages = computed(() => [
  { label: t('language.options.en'), value: 'en' },
  { label: t('language.options.es'), value: 'es' }
]);

const selectedLanguage = computed({
  get: () => locale.value,
  set: value => {
    if (value) locale.value = value;
  }
});

// Keeps the lang attribute of the page in sync for screen readers.
watch(locale, value => document.documentElement.setAttribute('lang', value), { immediate: true });
</script>

<template>
  <pv-select-button v-model="selectedLanguage"
                    :options="languages"
                    option-label="label"
                    option-value="value"
                    :allow-empty="false"
                    :aria-label="t('language.label')"/>
</template>

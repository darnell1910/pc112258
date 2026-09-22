<script setup>
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

/**
 * @summary Select buttons that switch the language of the user interface.
 * @remarks
 * Offers the two locales supported by the application, English and Spanish.
 * Changing the selection updates the global locale of Vue I18n, so every fixed
 * text of the interface is translated, and keeps the lang attribute of the
 * document synchronized for assistive technologies.
 * @author __AUTHOR_NAME__
 */
const { t, locale } = useI18n();

/**
 * Locales offered by the language switcher.
 *
 * @type {import('vue').ComputedRef<Array<{label: string, value: string}>>}
 */
const languages = computed(() => [
  { label: t('language.options.en'), value: 'en' },
  { label: t('language.options.es'), value: 'es' }
]);

/**
 * Locale currently selected in the user interface.
 *
 * @type {import('vue').WritableComputedRef<string>}
 */
const selectedLanguage = computed({
  get: () => locale.value,
  set: value => {
    if (value) locale.value = value;
  }
});

watch(
    locale,
    value => {
      document.documentElement.setAttribute('lang', value);
    },
    { immediate: true }
);
</script>

<template>
  <pv-select-button v-model="selectedLanguage"
                    class="language-switcher"
                    :options="languages"
                    option-label="label"
                    option-value="value"
                    :allow-empty="false"
                    :aria-label="t('language.label')"/>
</template>

<style scoped>
.language-switcher {
  white-space: nowrap;
}
</style>

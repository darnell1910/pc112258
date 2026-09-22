<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

/**
 * @summary Footer displayed at the bottom of the application.
 * @remarks
 * Presents the copyright notice of Open Brewery DB on the first line and the
 * identification of the developer of the application on the second one.
 * @author __AUTHOR_NAME__
 */
const { t } = useI18n();

/**
 * Identification of the developer of the application.
 *
 * @type {Readonly<{code: string, firstName: string, lastName: string}>}
 */
const developer = Object.freeze({
  code: '__AUTHOR_CODE__',
  firstName: '__AUTHOR_FIRST_NAME__',
  lastName: '__AUTHOR_LAST_NAME__'
});

/**
 * Developer information formatted for display.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const developerInformation = computed(
    () => `${developer.code} - ${developer.firstName} ${developer.lastName}`
);
</script>

<template>
  <div class="footer">
    <p class="footer__line">{{ t('footer.copyright') }}</p>
    <p class="footer__line">{{ t('footer.developed-by') }}: {{ developerInformation }}</p>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1.25rem 1rem;
  background-color: var(--p-content-background, #ffffff);
  border-top: 1px solid var(--p-content-border-color, #e0e0e0);
  text-align: center;
}

.footer__line {
  margin: 0;
  font-size: 0.875rem;
  color: var(--p-text-muted-color, #616161);
}
</style>

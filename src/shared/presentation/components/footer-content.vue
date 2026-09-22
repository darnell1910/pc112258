<script setup>
import { useI18n } from 'vue-i18n';

/**
 * Footer with the copyright of Open Brewery DB and the data of the developer.
 *
 * @author __AUTHOR_NAME__
 */
const { t } = useI18n();

const developer = {
  code: '__AUTHOR_CODE__',
  firstName: '__AUTHOR_FIRST_NAME__',
  lastName: '__AUTHOR_LAST_NAME__'
};
</script>

<template>
  <div class="footer">
    <p>{{ t('footer.copyright') }}</p>
    <p>{{ t('footer.developed-by') }}: {{ developer.code }} - {{ developer.firstName }} {{ developer.lastName }}</p>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1.25rem 1rem;
  background-color: #ffffff;
  border-top: 1px solid var(--p-content-border-color, #e0e0e0);
  text-align: center;
}

.footer p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--p-text-muted-color, #616161);
}
</style>

<script setup>
import { useI18n } from 'vue-i18n';

/**
 * Shown when the breweries could not be retrieved.
 *
 * @author __AUTHOR_NAME__
 */
const { errors } = defineProps({
  errors: { type: Array, default: () => [] }
});

const { t } = useI18n();
</script>

<template>
  <section class="unavailable" role="alert" aria-live="assertive">
    <i class="pi pi-exclamation-triangle unavailable-icon" aria-hidden="true"></i>
    <h3>{{ t('unavailable-content.title') }}</h3>
    <p class="unavailable-text">{{ t('unavailable-content.description') }}</p>
    <ul v-if="errors.length" class="unavailable-errors">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </section>
</template>

<style scoped>
.unavailable {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1rem;
  text-align: center;
}

.unavailable-icon {
  font-size: 2.5rem;
  color: var(--p-text-muted-color, #616161);
}

.unavailable-text {
  margin: 0;
  color: var(--p-text-muted-color, #616161);
}

.unavailable-errors {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;
  color: var(--p-text-muted-color, #616161);
}
</style>

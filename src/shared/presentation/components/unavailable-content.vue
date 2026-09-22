<script setup>
import { useI18n } from 'vue-i18n';

/**
 * @summary Placeholder shown when the requested content cannot be displayed.
 * @remarks
 * Communicates a failed retrieval to the user and lists the messages produced
 * by the application layer, keeping the error presentation consistent across
 * the whole application.
 * @author __AUTHOR_NAME__
 */

/**
 * Properties accepted by the UnavailableContent component.
 *
 * @typedef {Object} UnavailableContentProps
 * @property {string[]} errors - The messages describing why the content is unavailable.
 */

/** @type {UnavailableContentProps} */
const { errors } = defineProps({
  errors: { type: Array, default: () => [] }
});

const { t } = useI18n();
</script>

<template>
  <section class="unavailable-content" role="alert" aria-live="assertive">
    <i class="pi pi-exclamation-triangle unavailable-content__icon" aria-hidden="true"></i>
    <h3 class="unavailable-content__title">{{ t('unavailable-content.title') }}</h3>
    <p class="unavailable-content__description">{{ t('unavailable-content.description') }}</p>
    <ul v-if="errors.length" class="unavailable-content__errors">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </section>
</template>

<style scoped>
.unavailable-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1rem;
  text-align: center;
}

.unavailable-content__icon {
  font-size: 2.5rem;
  color: var(--p-text-muted-color, #616161);
}

.unavailable-content__title {
  margin: 0;
}

.unavailable-content__description {
  margin: 0;
  color: var(--p-text-muted-color, #616161);
}

.unavailable-content__errors {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;
  color: var(--p-text-muted-color, #616161);
}
</style>

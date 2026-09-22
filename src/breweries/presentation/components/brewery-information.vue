<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Brewery } from '@/breweries/domain/model/brewery.entity.js';

/**
 * Details of a brewery, shown with readable labels instead of the technical
 * names used by the API.
 *
 * @author __AUTHOR_NAME__
 */
const { brewery } = defineProps({
  brewery: { type: Brewery, required: true }
});

const { t, te } = useI18n();

// The provider may report a type we have no translation for, so we fall back
// to the readable version built by the entity.
const breweryType = computed(() => {
  const key = `brewery.types.${brewery.breweryType}`;
  return te(key) ? t(key) : brewery.getFormattedBreweryType();
});

const details = computed(() => [
  { label: t('brewery.labels.brewery-type'), value: breweryType.value },
  { label: t('brewery.labels.street'), value: brewery.street },
  { label: t('brewery.labels.city'), value: brewery.city },
  { label: t('brewery.labels.state-province'), value: brewery.stateProvince },
  { label: t('brewery.labels.postal-code'), value: brewery.postalCode },
  { label: t('brewery.labels.country'), value: brewery.country },
  { label: t('brewery.labels.phone'), value: brewery.getFormattedPhone() },
  { label: t('brewery.labels.coordinates'), value: brewery.getFormattedCoordinates() }
].filter(detail => detail.value));
</script>

<template>
  <dl class="details" :aria-label="t('brewery.information-label', { name: brewery.name })">
    <div v-for="detail in details" :key="detail.label" class="details-row">
      <dt class="details-label">{{ detail.label }}</dt>
      <dd class="details-value">{{ detail.value }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
}

.details-row {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 0.5rem;
  align-items: baseline;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--p-content-border-color, #eeeeee);
}

.details-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.details-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--p-text-muted-color, #757575);
}

.details-value {
  margin: 0;
  font-size: 0.9375rem;
  overflow-wrap: anywhere;
}

@media screen and (max-width: 575px) {
  .details-row {
    grid-template-columns: 1fr;
    gap: 0.125rem;
  }
}
</style>

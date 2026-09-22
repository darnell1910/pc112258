<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Brewery } from '@/breweries/domain/model/brewery.entity.js';

/**
 * @summary Component that displays the details of a brewery with human-friendly labels.
 * @remarks
 * Renders the attributes published by the Open Brewery DB API as a description
 * list, translating every technical name into a natural-language label and
 * omitting the attributes the provider did not supply, so no empty row is shown.
 * @author __AUTHOR_NAME__
 */

/**
 * Properties accepted by the BreweryInformation component.
 *
 * @typedef {Object} BreweryInformationProps
 * @property {Brewery} brewery - The brewery entity whose details are displayed.
 */

/** @type {BreweryInformationProps} */
const { brewery } = defineProps({
  brewery: { type: Brewery, required: true }
});

const { t, te } = useI18n();

/**
 * Type of brewery translated into the active locale.
 *
 * @remarks
 * Falls back to the human-friendly representation produced by the domain entity
 * when the provider reports a type that has no translation available.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const breweryType = computed(() => {
  const translationKey = `brewery.types.${brewery.breweryType}`;
  return te(translationKey) ? t(translationKey) : brewery.formattedBreweryType;
});

/**
 * Details of the brewery that hold a value, ready to be rendered.
 *
 * @type {import('vue').ComputedRef<Array<{label: string, value: string}>>}
 */
const details = computed(() =>
    [
      { label: t('brewery.labels.brewery-type'), value: breweryType.value },
      { label: t('brewery.labels.street'), value: brewery.address.street },
      { label: t('brewery.labels.city'), value: brewery.address.city },
      { label: t('brewery.labels.state-province'), value: brewery.address.stateProvince },
      { label: t('brewery.labels.postal-code'), value: brewery.address.postalCode },
      { label: t('brewery.labels.country'), value: brewery.address.country },
      { label: t('brewery.labels.phone'), value: brewery.formattedPhone },
      { label: t('brewery.labels.coordinates'), value: brewery.formattedCoordinates }
    ].filter(detail => detail.value !== '')
);
</script>

<template>
  <dl class="brewery-information" :aria-label="t('brewery.information-label', { name: brewery.name })">
    <div v-for="detail in details" :key="detail.label" class="brewery-information__row">
      <dt class="brewery-information__label">{{ detail.label }}</dt>
      <dd class="brewery-information__value">{{ detail.value }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.brewery-information {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
}

.brewery-information__row {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 0.5rem;
  align-items: baseline;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--p-content-border-color, #eeeeee);
}

.brewery-information__row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.brewery-information__label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--p-text-muted-color, #757575);
}

.brewery-information__value {
  margin: 0;
  font-size: 0.9375rem;
  overflow-wrap: anywhere;
}

@media screen and (max-width: 575px) {
  .brewery-information__row {
    grid-template-columns: 1fr;
    gap: 0.125rem;
  }
}
</style>

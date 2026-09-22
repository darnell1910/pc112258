<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { breweryStore } from '@/breweries/application/brewery.store.js';
import BreweryItem from '@/breweries/presentation/components/brewery-item.vue';
import UnavailableContent from '@/shared/presentation/components/unavailable-content.vue';

/**
 * @summary View that presents the catalog of breweries as a responsive grid of cards.
 * @remarks
 * Consumes the projection published by the application layer and renders one
 * card per brewery, two cards per row on medium screens and wider, and a single
 * card per row on small screens. It also resolves the loading, empty and error
 * states of the retrieval.
 * @author __AUTHOR_NAME__
 */
const { t } = useI18n();

/** @type {import('vue').ComputedRef<import('@/breweries/domain/model/brewery.entity.js').Brewery[]>} */
const breweries = computed(() => breweryStore.breweries);

/** @type {import('vue').ComputedRef<boolean>} */
const isLoading = computed(() => breweryStore.isLoading);

/** @type {import('vue').ComputedRef<boolean>} */
const hasErrors = computed(() => breweryStore.hasErrors);

/** @type {import('vue').ComputedRef<string[]>} */
const errors = computed(() => breweryStore.errors);

onMounted(() => {
  breweryStore.loadBreweries();
});
</script>

<template>
  <section class="brewery-list" aria-labelledby="brewery-list-title">
    <h2 id="brewery-list-title" class="brewery-list__title">{{ t('brewery-list.title') }}</h2>

    <div v-if="isLoading" class="brewery-list__status" role="status" aria-live="polite">
      <pv-progress-spinner :aria-label="t('brewery-list.loading')" style="width: 3rem; height: 3rem"/>
      <p class="brewery-list__status-text">{{ t('brewery-list.loading') }}</p>
    </div>

    <unavailable-content v-else-if="hasErrors" :errors="errors"/>

    <div v-else-if="!breweries.length" class="brewery-list__status" role="status" aria-live="polite">
      <i class="pi pi-inbox brewery-list__status-icon" aria-hidden="true"></i>
      <h3 class="brewery-list__status-title">{{ t('brewery-list.empty-title') }}</h3>
      <p class="brewery-list__status-text">{{ t('brewery-list.empty-description') }}</p>
    </div>

    <ul v-else class="grid brewery-list__grid" :aria-label="t('brewery-list.label')">
      <li v-for="brewery in breweries" :key="brewery.id" class="col-12 md:col-6 brewery-list__item">
        <brewery-item :brewery="brewery"/>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.brewery-list__title {
  margin: 0 0 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
}

.brewery-list__grid {
  margin: 0;
  padding: 0;
  list-style: none;
}

.brewery-list__item {
  display: flex;
}

.brewery-list__status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  text-align: center;
}

.brewery-list__status-icon {
  font-size: 2.5rem;
  color: var(--p-text-muted-color, #616161);
}

.brewery-list__status-title {
  margin: 0;
}

.brewery-list__status-text {
  margin: 0;
  color: var(--p-text-muted-color, #616161);
}
</style>

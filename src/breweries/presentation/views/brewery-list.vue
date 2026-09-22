<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { breweryStore } from '@/breweries/application/brewery.store.js';
import BreweryItem from '@/breweries/presentation/components/brewery-item.vue';
import UnavailableContent from '@/shared/presentation/components/unavailable-content.vue';

/**
 * Main view of the application. Shows the breweries as a grid of cards, two per
 * row from tablet width upwards and one per row on phones.
 *
 * @author __AUTHOR_NAME__
 */
const { t } = useI18n();

const breweries = computed(() => breweryStore.breweries);
const isLoading = computed(() => breweryStore.isLoading);
const errors = computed(() => breweryStore.errors);

onMounted(() => breweryStore.loadBreweries());
</script>

<template>
  <section aria-labelledby="brewery-list-title">
    <h2 id="brewery-list-title" class="view-title">{{ t('brewery-list.title') }}</h2>

    <div v-if="isLoading" class="view-status" role="status" aria-live="polite">
      <pv-progress-spinner :aria-label="t('brewery-list.loading')" style="width: 3rem; height: 3rem"/>
      <p class="view-status-text">{{ t('brewery-list.loading') }}</p>
    </div>

    <unavailable-content v-else-if="errors.length" :errors="errors"/>

    <div v-else-if="!breweries.length" class="view-status" role="status" aria-live="polite">
      <i class="pi pi-inbox view-status-icon" aria-hidden="true"></i>
      <h3>{{ t('brewery-list.empty-title') }}</h3>
      <p class="view-status-text">{{ t('brewery-list.empty-description') }}</p>
    </div>

    <ul v-else class="grid brewery-grid" :aria-label="t('brewery-list.label')">
      <li v-for="brewery in breweries" :key="brewery.id" class="col-12 md:col-6 brewery-grid-item">
        <brewery-item :brewery="brewery"/>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.view-title {
  margin: 0 0 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
}

.brewery-grid {
  margin: 0;
  padding: 0;
  list-style: none;
}

.brewery-grid-item {
  display: flex;
}

.view-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  text-align: center;
}

.view-status-icon {
  font-size: 2.5rem;
  color: var(--p-text-muted-color, #616161);
}

.view-status-text {
  margin: 0;
  color: var(--p-text-muted-color, #616161);
}
</style>

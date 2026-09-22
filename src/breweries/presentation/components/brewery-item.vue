<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { Brewery } from '@/breweries/domain/model/brewery.entity.js';
import BreweryInformation from '@/breweries/presentation/components/brewery-information.vue';

/**
 * Card of a single brewery: logo on top, name as title, website as subtitle,
 * details as content and the two actions in the footer.
 *
 * @author __AUTHOR_NAME__
 */
const { brewery } = defineProps({
  brewery: { type: Brewery, required: true }
});

const { t } = useI18n();
const toast = useToast();

const logoFailed = ref(false);
const showLogo = computed(() => brewery.urlToLogo !== '' && !logoFailed.value);
const website = computed(() => brewery.websiteUrl.toString());

const shareData = computed(() => {
  const data = {
    title: brewery.name,
    text: [brewery.name, brewery.getFullAddress()].filter(part => part).join(' - ')
  };
  if (brewery.hasWebsite()) data.url = website.value;
  return data;
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shareData.value.url ?? shareData.value.text);
    toast.add({ severity: 'info', summary: t('brewery.link-copied'), life: 3000 });
  } catch (error) {
    console.error('Failed to copy the brewery information:', error);
    toast.add({ severity: 'warn', summary: t('brewery.share-failed'), life: 3000 });
  }
};

/**
 * Shares the brewery with the browser, or copies it to the clipboard when the
 * Web Share API is not available.
 *
 * @returns {Promise<void>}
 */
const shareInformation = async () => {
  if (navigator.share) {
    try {
      await navigator.share(shareData.value);
      toast.add({ severity: 'success', summary: t('brewery.share-succeeded'), life: 3000 });
      return;
    } catch (error) {
      // The user closing the share dialog is not an error worth reporting.
      if (error?.name === 'AbortError') return;
      console.error('Failed to share the brewery information:', error);
    }
  }
  await copyToClipboard();
};
</script>

<template>
  <pv-card class="brewery-card" :aria-label="t('brewery.card-label', { name: brewery.name })">
    <template #header>
      <div class="logo-band">
        <img v-if="showLogo"
             class="logo"
             :src="brewery.urlToLogo"
             :alt="t('brewery.logo-alt', { name: brewery.name })"
             loading="lazy"
             @error="logoFailed = true"/>
        <i v-else class="pi pi-building logo-placeholder" aria-hidden="true"></i>
      </div>
    </template>

    <template #title>
      <h3 class="brewery-name">{{ brewery.name }}</h3>
    </template>

    <template #subtitle>
      <span class="brewery-website">{{ brewery.hasWebsite() ? website : t('brewery.no-website') }}</span>
    </template>

    <template #content>
      <brewery-information :brewery="brewery"/>
    </template>

    <template #footer>
      <div class="card-actions">
        <pv-button v-if="brewery.hasWebsite()"
                   as="a"
                   :href="website"
                   target="_blank"
                   rel="noopener noreferrer"
                   :label="t('brewery.go-to-website')"
                   :aria-label="t('brewery.go-to-website-label', { name: brewery.name })"
                   icon="pi pi-external-link"
                   link
                   class="p-0"/>
        <span v-else class="no-website">{{ t('brewery.no-website') }}</span>
        <pv-button :label="t('brewery.share-information')"
                   :aria-label="t('brewery.share-information-label', { name: brewery.name })"
                   icon="pi pi-share-alt"
                   text
                   size="small"
                   @click="shareInformation"/>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.brewery-card {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Makes every card in a row end at the same height. */
.brewery-card :deep(.p-card-body) {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.brewery-card :deep(.p-card-content) {
  flex: 1;
}

.logo-band {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  padding: 1rem;
  background-color: var(--p-surface-100, #f5f5f5);
  border-radius: 6px 6px 0 0;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.logo-placeholder {
  font-size: 3rem;
  color: var(--p-text-muted-color, #9e9e9e);
}

.brewery-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.brewery-website {
  font-size: 0.875rem;
  overflow-wrap: anywhere;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.no-website {
  font-size: 0.875rem;
  color: var(--p-text-muted-color, #9e9e9e);
}
</style>

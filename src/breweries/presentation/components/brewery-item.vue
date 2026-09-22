<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { Brewery } from '@/breweries/domain/model/brewery.entity.js';
import BreweryInformation from '@/breweries/presentation/components/brewery-information.vue';

/**
 * @summary Card that presents a single brewery of the Open Brewery DB catalog.
 * @remarks
 * Displays the logo of the brewery on top, its name as the title and its
 * website as the subtitle, delegates the remaining attributes to the
 * BreweryInformation component, and offers the navigation and sharing actions
 * in the footer of the card.
 * @author __AUTHOR_NAME__
 */

/**
 * Properties accepted by the BreweryItem component.
 *
 * @typedef {Object} BreweryItemProps
 * @property {Brewery} brewery - The brewery entity to present.
 */

/** @type {BreweryItemProps} */
const { brewery } = defineProps({
  brewery: { type: Brewery, required: true }
});

const { t } = useI18n();
const toast = useToast();

/**
 * Indicates whether the logo served by the branding provider failed to load.
 *
 * @type {import('vue').Ref<boolean>}
 */
const isLogoUnavailable = ref(false);

/**
 * Indicates whether a logo can be displayed for the brewery.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasLogo = computed(() => brewery.urlToLogo !== '' && !isLogoUnavailable.value);

/**
 * Information shared when the user requests to share the brewery.
 *
 * @type {import('vue').ComputedRef<{title: string, text: string, url?: string}>}
 */
const shareData = computed(() => {
  const data = {
    title: brewery.name,
    text: [brewery.name, brewery.formattedAddress].filter(part => part !== '').join(' - ')
  };
  if (brewery.hasWebsite) data.url = brewery.websiteAddress;
  return data;
});

/**
 * Records that the logo could not be displayed, so a fallback icon is shown.
 *
 * @returns {void}
 */
const onLogoError = () => {
  isLogoUnavailable.value = true;
};

/**
 * Copies the information of the brewery to the clipboard.
 *
 * @returns {Promise<void>} A promise that settles once the user has been notified.
 */
const copyInformationToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shareData.value.url ?? shareData.value.text);
    toast.add({ severity: 'info', summary: t('brewery.link-copied'), life: 3000 });
  } catch (error) {
    console.error('Failed to copy the brewery information:', error);
    toast.add({ severity: 'warn', summary: t('brewery.share-failed'), life: 3000 });
  }
};

/**
 * Shares the brewery through the share capability of the browser.
 *
 * @remarks
 * Falls back to copying the information to the clipboard when the Web Share API
 * is not available or the browser rejects the request.
 *
 * @returns {Promise<void>} A promise that settles once the user has been notified.
 */
const shareInformation = async () => {
  if (navigator.share) {
    try {
      await navigator.share(shareData.value);
      toast.add({ severity: 'success', summary: t('brewery.share-succeeded'), life: 3000 });
      return;
    } catch (error) {
      if (error?.name === 'AbortError') return;
      console.error('Failed to share the brewery information:', error);
    }
  }
  await copyInformationToClipboard();
};
</script>

<template>
  <pv-card class="brewery-card" :aria-label="t('brewery.card-label', { name: brewery.name })">
    <template #header>
      <div class="brewery-card__header">
        <img v-if="hasLogo"
             class="brewery-card__logo"
             :src="brewery.urlToLogo"
             :alt="t('brewery.logo-alt', { name: brewery.name })"
             loading="lazy"
             @error="onLogoError"/>
        <i v-else class="pi pi-building brewery-card__logo-fallback" aria-hidden="true"></i>
      </div>
    </template>

    <template #title>
      <h3 class="brewery-card__title">{{ brewery.name }}</h3>
    </template>

    <template #subtitle>
      <span class="brewery-card__subtitle">
        {{ brewery.hasWebsite ? brewery.websiteAddress : t('brewery.no-website') }}
      </span>
    </template>

    <template #content>
      <brewery-information :brewery="brewery"/>
    </template>

    <template #footer>
      <div class="brewery-card__actions">
        <pv-button v-if="brewery.hasWebsite"
                   as="a"
                   :href="brewery.websiteAddress"
                   target="_blank"
                   rel="noopener noreferrer"
                   :label="t('brewery.go-to-website')"
                   :aria-label="t('brewery.go-to-website-label', { name: brewery.name })"
                   icon="pi pi-external-link"
                   link
                   class="p-0"/>
        <span v-else class="brewery-card__action-placeholder">{{ t('brewery.no-website') }}</span>
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

.brewery-card :deep(.p-card-body) {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.brewery-card :deep(.p-card-content) {
  flex: 1;
}

.brewery-card__header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  padding: 1rem;
  background-color: var(--p-surface-100, #f5f5f5);
  border-radius: var(--p-content-border-radius, 6px) var(--p-content-border-radius, 6px) 0 0;
}

.brewery-card__logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.brewery-card__logo-fallback {
  font-size: 3rem;
  color: var(--p-text-muted-color, #9e9e9e);
}

.brewery-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.brewery-card__subtitle {
  font-size: 0.875rem;
  overflow-wrap: anywhere;
}

.brewery-card__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.brewery-card__action-placeholder {
  font-size: 0.875rem;
  color: var(--p-text-muted-color, #9e9e9e);
}
</style>

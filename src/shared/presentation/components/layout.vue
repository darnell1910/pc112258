<script setup>
import { useI18n } from 'vue-i18n';
import ToolbarContent from '@/shared/presentation/components/toolbar-content.vue';
import FooterContent from '@/shared/presentation/components/footer-content.vue';
import BreweryList from '@/breweries/presentation/views/brewery-list.vue';

/**
 * Structure of the page: toolbar, main content and footer.
 * There is no routing in this application, so the main area renders the brewery
 * list directly.
 *
 * @author __AUTHOR_NAME__
 */
const { t } = useI18n();
</script>

<template>
  <div class="layout">
    <pv-toast position="bottom-center"/>
    <header class="layout-header">
      <toolbar-content/>
    </header>
    <main class="layout-main" :aria-label="t('application.main-label')">
      <brewery-list/>
    </main>
    <footer :aria-label="t('footer.label')">
      <footer-content/>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.layout-main {
  flex: 1;
  padding: 1rem;
}

@media screen and (min-width: 768px) {
  .layout-main {
    padding: 2rem;
  }
}
</style>

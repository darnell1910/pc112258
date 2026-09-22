<script setup>
import { useI18n } from 'vue-i18n';
import ToolbarContent from '@/shared/presentation/components/toolbar-content.vue';
import FooterContent from '@/shared/presentation/components/footer-content.vue';
import BreweryList from '@/breweries/presentation/views/brewery-list.vue';

/**
 * @summary Shared layout that defines the structure of the application shell.
 * @remarks
 * Composes the three landmark regions of the page: the toolbar at the top, the
 * main content hosting the brewery list view, and the footer at the bottom.
 * Routing is out of the scope of this application, so the main region renders
 * the home view directly.
 * @author __AUTHOR_NAME__
 */
const { t } = useI18n();
</script>

<template>
  <div class="layout">
    <pv-toast position="bottom-center"/>
    <header class="layout__header">
      <toolbar-content/>
    </header>
    <main class="layout__main" :aria-label="t('application.main-label')">
      <brewery-list/>
    </main>
    <footer class="layout__footer" :aria-label="t('footer.label')">
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

.layout__header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.layout__main {
  flex: 1;
  padding: 1rem;
}

@media screen and (min-width: 768px) {
  .layout__main {
    padding: 2rem;
  }
}
</style>

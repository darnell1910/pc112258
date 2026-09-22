import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * @summary Vite build configuration for the Open Breweries DB application.
 * @remarks
 * Registers the Vue single-file-component plugin and the '@' path alias that
 * points to the 'src' folder, so every layer can be imported with an absolute,
 * domain-oriented path (for example '@/breweries/domain/model/brewery.entity.js').
 * @author __AUTHOR_NAME__
 */
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});

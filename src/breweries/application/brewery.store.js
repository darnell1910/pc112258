import { reactive } from 'vue';
import { BreweriesApi } from '@/breweries/infrastructure/breweries-api.js';
import { BreweriesRequest } from '@/breweries/infrastructure/breweries.request.js';
import { BreweryAssembler } from '@/breweries/infrastructure/brewery.assembler.js';

/**
 * Infrastructure adapter used to reach the Open Brewery DB API.
 *
 * @type {BreweriesApi}
 */
const breweriesApi = new BreweriesApi();

/**
 * Assembler used to translate provider resources into domain entities.
 *
 * @type {BreweryAssembler}
 */
const breweryAssembler = new BreweryAssembler();

/**
 * Reactive state and use cases exposed by the breweries store.
 *
 * @typedef {Object} BreweryStore
 * @property {import('@/breweries/domain/model/brewery.entity.js').Brewery[]} breweries - The breweries currently loaded.
 * @property {string[]} errors - The messages produced by the failed operations.
 * @property {boolean} isLoading - Indicates whether a retrieval is in progress.
 * @property {boolean} hasBreweries - Indicates whether at least one brewery is available.
 * @property {boolean} hasErrors - Indicates whether the last operation failed.
 * @property {(request?: BreweriesRequest) => Promise<void>} loadBreweries - Retrieves and assembles the breweries.
 */

/**
 * @summary Application service that orchestrates the brewery use cases and holds their state.
 * @remarks
 * Acts as the application layer of the solution: it coordinates the
 * infrastructure adapter and the assembler, and publishes a reactive projection
 * that the presentation layer consumes. Routing and global state libraries are
 * out of the scope of this application, so the store is built with the
 * reactivity primitives of the Vue Composition API.
 * @author __AUTHOR_NAME__
 * @type {BreweryStore}
 */
export const breweryStore = reactive({
    breweries: [],
    errors: [],
    isLoading: false,

    /**
     * Indicates whether at least one brewery is available.
     *
     * @returns {boolean} True when the store holds breweries.
     */
    get hasBreweries() {
        return this.breweries.length > 0;
    },

    /**
     * Indicates whether the last operation produced errors.
     *
     * @returns {boolean} True when the store holds error messages.
     */
    get hasErrors() {
        return this.errors.length > 0;
    },

    /**
     * Retrieves the breweries from the provider and projects them as domain entities.
     *
     * @param {BreweriesRequest} [request=new BreweriesRequest()] - The criteria applied to the query.
     * @returns {Promise<void>} A promise that settles once the state has been updated.
     */
    async loadBreweries(request = new BreweriesRequest()) {
        this.isLoading = true;
        this.errors = [];
        try {
            const response = await breweriesApi.getBreweries(request);
            this.breweries = breweryAssembler.toEntitiesFromResponse(response);
        } catch (message) {
            this.errors.push(message);
            this.breweries = [];
        } finally {
            this.isLoading = false;
        }
    }
});

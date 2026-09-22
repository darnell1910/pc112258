import { reactive } from 'vue';
import { BreweriesApi } from '@/breweries/infrastructure/breweries-api.js';
import { BreweriesRequest } from '@/breweries/infrastructure/breweries.request.js';
import { BreweryAssembler } from '@/breweries/infrastructure/brewery.assembler.js';

const breweriesApi = new BreweriesApi();
const breweryAssembler = new BreweryAssembler();

/**
 * Store of the breweries sub-domain. Coordinates the API and the assembler, and
 * keeps the reactive state that the views consume. Routing and Pinia are out of
 * scope, so it is built with the reactivity of the Composition API.
 *
 * @author __AUTHOR_NAME__
 */
export const breweryStore = reactive({
    /** @type {import('@/breweries/domain/model/brewery.entity.js').Brewery[]} */
    breweries: [],
    /** @type {string[]} */
    errors: [],
    isLoading: false,

    /**
     * Loads the breweries and turns them into domain entities.
     *
     * @param {BreweriesRequest} [request=new BreweriesRequest()]
     * @returns {Promise<void>}
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

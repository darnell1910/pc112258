import { BreweryResource } from '@/breweries/infrastructure/brewery.resource.js';

/**
 * Collection of breweries returned by the provider.
 * The API answers with a plain JSON array, so this class gives it a shape and
 * protects the application from malformed payloads.
 *
 * @author __AUTHOR_NAME__
 */
export class BreweriesResponse {
    /**
     * @param {Array<Object>} [payload=[]]
     */
    constructor(payload = []) {
        /** @type {BreweryResource[]} */
        this.breweries = Array.isArray(payload) ? payload.map(record => new BreweryResource(record)) : [];
    }

    /**
     * @param {import('axios').AxiosResponse} httpResponse
     * @returns {BreweriesResponse}
     */
    static fromHttpResponse(httpResponse) {
        return new BreweriesResponse(httpResponse?.data);
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return this.breweries.length === 0;
    }
}

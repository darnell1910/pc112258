import { BreweryResource } from '@/breweries/infrastructure/brewery.resource.js';

/**
 * @summary Response object that wraps the collection of breweries returned by the provider.
 * @remarks
 * Implements the Response pattern. The Open Brewery DB API answers with a bare
 * JSON array, so this object gives that payload an explicit shape and protects
 * the rest of the application from unexpected or malformed responses.
 * @author __AUTHOR_NAME__
 */
export class BreweriesResponse {
    /**
     * Creates a new BreweriesResponse.
     *
     * @param {Array<Object>} [payload=[]] - The collection of brewery records published by the provider.
     */
    constructor(payload = []) {
        /** @type {BreweryResource[]} */
        this.breweries = Array.isArray(payload) ? payload.map(record => new BreweryResource(record)) : [];
    }

    /**
     * Builds a response object from the raw answer of the HTTP client.
     *
     * @param {import('axios').AxiosResponse} httpResponse - The HTTP response received from the provider.
     * @returns {BreweriesResponse} The assembled response object.
     */
    static fromHttpResponse(httpResponse) {
        return new BreweriesResponse(httpResponse?.data);
    }

    /**
     * Returns the number of brewery resources contained in the response.
     *
     * @returns {number} The size of the collection.
     */
    get size() {
        return this.breweries.length;
    }

    /**
     * Indicates whether the provider returned no brewery.
     *
     * @returns {boolean} True when the collection is empty.
     */
    get isEmpty() {
        return this.size === 0;
    }
}

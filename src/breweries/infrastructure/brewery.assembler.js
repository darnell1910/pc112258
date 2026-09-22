import { Brewery } from '@/breweries/domain/model/brewery.entity.js';
import { BreweriesResponse } from '@/breweries/infrastructure/breweries.response.js';
import { BreweryResource } from '@/breweries/infrastructure/brewery.resource.js';
import { LogoDevApi } from '@/shared/infrastructure/logo-dev-api.js';

/**
 * @summary Assembler that maps brewery resources into Brewery domain entities.
 * @remarks
 * Implements the Assembler pattern, acting as the data mapper between the
 * snake_case contract published by the Open Brewery DB API and the naming
 * conventions of the domain layer. It also enriches every entity with the logo
 * resolved through the Logo.dev Logo API, and discards the records that cannot
 * satisfy the invariants of the Brewery entity.
 * @author __AUTHOR_NAME__
 */
export class BreweryAssembler {
    /** @type {LogoDevApi} */
    #logoApi;

    /**
     * Creates a new BreweryAssembler.
     */
    constructor() {
        this.#logoApi = new LogoDevApi();
    }

    /**
     * Maps every resource contained in a response into a Brewery entity.
     *
     * @param {BreweriesResponse} response - The response received from the provider.
     * @returns {Brewery[]} The assembled entities, excluding the invalid records.
     */
    toEntitiesFromResponse(response) {
        if (!(response instanceof BreweriesResponse)) return [];
        return response.breweries
            .map(resource => {
                try {
                    return this.toEntityFromResource(resource);
                } catch (error) {
                    console.error('Validation error for brewery:', error.message, resource);
                    return null;
                }
            })
            .filter(brewery => brewery !== null);
    }

    /**
     * Maps a single brewery resource into a Brewery entity.
     *
     * @param {BreweryResource} resource - The brewery record published by the provider.
     * @returns {Brewery} The assembled Brewery entity.
     * @throws {Error} When the resource does not satisfy the invariants of the entity.
     */
    toEntityFromResource(resource) {
        const brewery = new Brewery({
            id: resource.id,
            name: resource.name,
            breweryType: resource.brewery_type,
            address: {
                street: resource.street,
                city: resource.city,
                stateProvince: resource.state_province,
                postalCode: resource.postal_code,
                country: resource.country
            },
            phone: resource.phone,
            websiteUrl: resource.website_url,
            coordinates: { latitude: resource.latitude, longitude: resource.longitude }
        });
        brewery.urlToLogo = this.#logoApi.getUrlToLogo(brewery.websiteUrl);
        return brewery;
    }
}

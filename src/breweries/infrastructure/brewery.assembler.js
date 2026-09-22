import { Brewery } from '@/breweries/domain/model/brewery.entity.js';
import { BreweriesResponse } from '@/breweries/infrastructure/breweries.response.js';
import { BreweryResource } from '@/breweries/infrastructure/brewery.resource.js';
import { LogoDevApi } from '@/shared/infrastructure/logo-dev-api.js';

/**
 * Maps brewery resources into Brewery entities and adds the logo of each one.
 * Records that do not pass the validations of the entity are discarded.
 *
 * @author __AUTHOR_NAME__
 */
export class BreweryAssembler {
    #logoApi;

    constructor() {
        this.#logoApi = new LogoDevApi();
    }

    /**
     * @param {BreweriesResponse} response
     * @returns {Brewery[]}
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
     * @param {BreweryResource} resource
     * @returns {Brewery}
     */
    toEntityFromResource(resource) {
        const brewery = new Brewery({
            id: resource.id,
            name: resource.name,
            breweryType: resource.brewery_type,
            street: resource.street,
            city: resource.city,
            stateProvince: resource.state_province,
            postalCode: resource.postal_code,
            country: resource.country,
            phone: resource.phone,
            websiteUrl: resource.website_url,
            latitude: resource.latitude,
            longitude: resource.longitude
        });
        brewery.urlToLogo = this.#logoApi.getUrlToLogo(brewery.websiteUrl);
        return brewery;
    }
}

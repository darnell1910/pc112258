/**
 * Brewery record exactly as it is published by the Open Brewery DB API.
 *
 * @typedef {Object} BreweryResourcePayload
 * @property {string} [id] - The unique identifier of the brewery.
 * @property {string} [name] - The commercial name of the brewery.
 * @property {string} [brewery_type] - The type of brewery.
 * @property {string} [address_1] - The first address line of the brewery.
 * @property {string} [street] - The street of the brewery.
 * @property {string} [city] - The city of the brewery.
 * @property {string} [state_province] - The state or province of the brewery.
 * @property {string} [state] - The state of the brewery.
 * @property {string} [postal_code] - The postal code of the brewery.
 * @property {string} [country] - The country of the brewery.
 * @property {string} [phone] - The contact telephone number of the brewery.
 * @property {string} [website_url] - The website of the brewery.
 * @property {string} [latitude] - The latitude of the brewery.
 * @property {string} [longitude] - The longitude of the brewery.
 */

/**
 * @summary Resource object that mirrors the brewery representation exposed by the provider.
 * @remarks
 * Implements the Resource pattern. Its attributes intentionally keep the
 * snake_case naming of the Open Brewery DB API, because a resource is a faithful
 * copy of the external contract. This naming never reaches the domain layer:
 * translating it into the conventions of the Brewery entity is the exclusive
 * responsibility of the BreweryAssembler.
 * @author __AUTHOR_NAME__
 */
export class BreweryResource {
    /**
     * Creates a new BreweryResource from a record published by the provider.
     *
     * @param {BreweryResourcePayload} [payload={}] - The raw brewery record.
     */
    constructor(payload = {}) {
        this.id = payload.id ?? '';
        this.name = payload.name ?? '';
        this.brewery_type = payload.brewery_type ?? '';
        this.street = payload.street ?? payload.address_1 ?? '';
        this.city = payload.city ?? '';
        this.state_province = payload.state_province ?? payload.state ?? '';
        this.postal_code = payload.postal_code ?? '';
        this.country = payload.country ?? '';
        this.phone = payload.phone ?? '';
        this.website_url = payload.website_url ?? '';
        this.latitude = payload.latitude ?? null;
        this.longitude = payload.longitude ?? null;
    }
}

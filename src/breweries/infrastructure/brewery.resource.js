/**
 * Brewery as it comes from the Open Brewery DB API.
 * The attributes keep the snake_case naming of the provider on purpose: this is
 * a copy of the external contract and never reaches the domain layer, the
 * assembler is the one in charge of translating it.
 *
 * @author __AUTHOR_NAME__
 */
export class BreweryResource {
    /**
     * @param {Object} [payload={}] - raw brewery record.
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

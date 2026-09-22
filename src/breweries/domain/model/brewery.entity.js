import { StringValidator } from '@/shared/domain/model/string-validator.js';
import { Url } from '@/shared/domain/model/url.js';

/**
 * A brewery of the Open Brewery DB catalog.
 * Attribute names follow the JavaScript conventions, not the ones used by the
 * API: mapping between both is done by the assembler.
 *
 * @author __AUTHOR_NAME__
 */
export class Brewery {
    /**
     * @param {Object} props
     * @throws {Error} if the id or the name is missing.
     */
    constructor({
                    id = '', name = '', breweryType = '', street = '', city = '', stateProvince = '',
                    postalCode = '', country = '', phone = '', websiteUrl = '', latitude = null, longitude = null
                }) {
        if (!StringValidator.isNotEmptyString(id)) throw new Error('Brewery id must be a non-empty string');
        if (!StringValidator.isNotEmptyString(name)) throw new Error('Brewery name must be a non-empty string');

        this.id = id;
        this.name = name;
        this.breweryType = breweryType;
        this.street = street;
        this.city = city;
        this.stateProvince = stateProvince;
        this.postalCode = postalCode;
        this.country = country;
        this.phone = phone;
        this.websiteUrl = websiteUrl instanceof Url ? websiteUrl : new Url(websiteUrl);
        this.latitude = latitude;
        this.longitude = longitude;
        this.urlToLogo = '';
    }

    /**
     * @returns {boolean} true when the brewery published a website.
     */
    hasWebsite() {
        return !this.websiteUrl.isEmpty();
    }

    /**
     * @returns {string} the brewery type as a readable label, for example 'Brewpub'.
     */
    getFormattedBreweryType() {
        return StringValidator.toHumanFriendlyLabel(this.breweryType);
    }

    /**
     * Formats the phone as (000) 000-0000 when it has ten digits.
     *
     * @returns {string}
     */
    getFormattedPhone() {
        const digits = String(this.phone ?? '').replace(/\D/g, '');
        if (digits.length !== 10) return digits;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    /**
     * @returns {string} latitude and longitude, or an empty string when unknown.
     */
    getFormattedCoordinates() {
        const latitude = Number.parseFloat(this.latitude);
        const longitude = Number.parseFloat(this.longitude);
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return '';
        return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }

    /**
     * @returns {string} the whole address in a single line.
     */
    getFullAddress() {
        const region = [this.stateProvince, this.postalCode].filter(part => part).join(' ');
        return [this.street, this.city, region, this.country].filter(part => part).join(', ');
    }
}

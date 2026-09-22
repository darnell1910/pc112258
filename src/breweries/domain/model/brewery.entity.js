import { Address } from '@/shared/domain/model/address.js';
import { Coordinates } from '@/shared/domain/model/coordinates.js';
import { PhoneNumber } from '@/shared/domain/model/phone-number.js';
import { StringValidator } from '@/shared/domain/model/string-validator.js';
import { Url } from '@/shared/domain/model/url.js';

/**
 * Properties accepted when a Brewery entity is created.
 *
 * @typedef {Object} BreweryProps
 * @property {string} id - The unique identifier of the brewery.
 * @property {string} name - The commercial name of the brewery.
 * @property {string} [breweryType] - The type of brewery, for example 'micro' or 'brewpub'.
 * @property {Object|Address} [address] - The postal location of the brewery.
 * @property {string|PhoneNumber} [phone] - The contact telephone number of the brewery.
 * @property {string|Url} [websiteUrl] - The website of the brewery.
 * @property {Object|Coordinates} [coordinates] - The geographic position of the brewery.
 */

/**
 * @summary Domain entity that represents a brewery published in the Open Brewery DB catalog.
 * @remarks
 * The entity is identified by its id and is self-validating: it refuses to be
 * created in an invalid state. Its attributes follow the JavaScript naming
 * conventions in English and are independent from the naming used by the data
 * provider, whose translation is a responsibility of the assembler.
 * @author __AUTHOR_NAME__
 */
export class Brewery {
    /**
     * Creates a new Brewery entity.
     *
     * @param {BreweryProps} props - The properties used to build the entity.
     * @throws {Error} When the identifier or the name of the brewery is missing.
     */
    constructor({ id = '', name = '', breweryType = '', address = null, phone = '', websiteUrl = '', coordinates = null }) {
        if (!StringValidator.isNotEmptyString(id)) throw new Error('Brewery id must be a non-empty string');
        if (!StringValidator.isNotEmptyString(name)) throw new Error('Brewery name must be a non-empty string');

        this.id = id;
        this.name = name;
        this.breweryType = breweryType;
        this.address = address instanceof Address ? address : new Address(address ?? {});
        this.phone = phone instanceof PhoneNumber ? phone : new PhoneNumber(phone);
        this.websiteUrl = websiteUrl instanceof Url ? websiteUrl : new Url(websiteUrl);
        this.coordinates = coordinates instanceof Coordinates ? coordinates : new Coordinates(coordinates ?? {});
        this.urlToLogo = '';
    }

    /**
     * Indicates whether the brewery published a website.
     *
     * @returns {boolean} True when a valid website is available.
     */
    get hasWebsite() {
        return !this.websiteUrl.isEmpty();
    }

    /**
     * Returns the type of brewery as a human-friendly label.
     *
     * @returns {string} The type of brewery, for example 'Brewpub'.
     */
    get formattedBreweryType() {
        return StringValidator.toHumanFriendlyLabel(this.breweryType);
    }

    /**
     * Returns the complete postal address of the brewery in a single line.
     *
     * @returns {string} The formatted address of the brewery.
     */
    get formattedAddress() {
        return this.address.toString();
    }

    /**
     * Returns the contact telephone number of the brewery formatted for display.
     *
     * @returns {string} The formatted telephone number of the brewery.
     */
    get formattedPhone() {
        return this.phone.toString();
    }

    /**
     * Returns the geographic position of the brewery formatted for display.
     *
     * @returns {string} The formatted coordinates of the brewery.
     */
    get formattedCoordinates() {
        return this.coordinates.toString();
    }

    /**
     * Returns the website of the brewery as a plain string.
     *
     * @returns {string} The website of the brewery, or an empty string when it is unknown.
     */
    get websiteAddress() {
        return this.websiteUrl.toString();
    }
}

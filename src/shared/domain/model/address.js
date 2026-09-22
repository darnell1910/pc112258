import { StringValidator } from '@/shared/domain/model/string-validator.js';

/**
 * @summary Immutable value object that represents the postal location of a brewery.
 * @remarks
 * Grouping street, city, state or province, postal code and country into a single
 * value object keeps the Brewery entity free of loosely related primitives and
 * concentrates the address formatting rules in one place.
 * @author __AUTHOR_NAME__
 */
export class Address {
    /** @type {string} */
    #street;
    /** @type {string} */
    #city;
    /** @type {string} */
    #stateProvince;
    /** @type {string} */
    #postalCode;
    /** @type {string} */
    #country;

    /**
     * Normalizes a candidate address part into a trimmed string.
     *
     * @param {*} value - The candidate address part.
     * @returns {string} The trimmed value, or an empty string when it is not usable.
     */
    static #normalize(value) {
        return StringValidator.isNotEmptyString(value) ? value.trim() : '';
    }

    /**
     * Creates a new Address value object.
     *
     * @param {Object} [addressParts={}] - The parts that compose the address.
     * @param {string} [addressParts.street] - The street of the brewery.
     * @param {string} [addressParts.city] - The city of the brewery.
     * @param {string} [addressParts.stateProvince] - The state or province of the brewery.
     * @param {string} [addressParts.postalCode] - The postal code of the brewery.
     * @param {string} [addressParts.country] - The country of the brewery.
     */
    constructor({ street = '', city = '', stateProvince = '', postalCode = '', country = '' } = {}) {
        this.#street = Address.#normalize(street);
        this.#city = Address.#normalize(city);
        this.#stateProvince = Address.#normalize(stateProvince);
        this.#postalCode = Address.#normalize(postalCode);
        this.#country = Address.#normalize(country);
        Object.freeze(this);
    }

    /** @returns {string} The street of the address. */
    get street() {
        return this.#street;
    }

    /** @returns {string} The city of the address. */
    get city() {
        return this.#city;
    }

    /** @returns {string} The state or province of the address. */
    get stateProvince() {
        return this.#stateProvince;
    }

    /** @returns {string} The postal code of the address. */
    get postalCode() {
        return this.#postalCode;
    }

    /** @returns {string} The country of the address. */
    get country() {
        return this.#country;
    }

    /**
     * Indicates whether every part of the address is missing.
     *
     * @returns {boolean} True when the address holds no information.
     */
    isEmpty() {
        return this.toString() === '';
    }

    /**
     * Returns the complete address formatted in a single line.
     *
     * @returns {string} The address, for example '1716 Topeka St, Norman, Oklahoma 73069, United States'.
     */
    toString() {
        const region = [this.#stateProvince, this.#postalCode].filter(part => part !== '').join(' ');
        return [this.#street, this.#city, region, this.#country].filter(part => part !== '').join(', ');
    }

    /**
     * Compares this value object with another one by value.
     *
     * @param {Address} other - The value object to compare against.
     * @returns {boolean} True when both value objects hold the same address.
     */
    equals(other) {
        return other instanceof Address && this.toString() === other.toString();
    }
}

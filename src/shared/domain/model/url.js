/**
 * @summary Immutable value object that represents a well-formed URL inside the domain.
 * @remarks
 * Invalid or missing URLs are normalized to an empty value instead of throwing,
 * because the Open Brewery DB catalog contains breweries without a website.
 * @author __AUTHOR_NAME__
 */
export class Url {
    /** @type {string} */
    #value;

    /**
     * Validates whether a value is a well-formed URL.
     *
     * @param {*} value - The candidate URL.
     * @returns {boolean} True when the value can be parsed as a URL, false otherwise.
     */
    static isValidUrl(value) {
        if (typeof value !== 'string' && !(value instanceof String)) return false;
        if (typeof URL.canParse === 'function') return URL.canParse(value);
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Creates a new Url value object.
     *
     * @param {string} [value=''] - The URL string to wrap.
     */
    constructor(value = '') {
        this.#value = Url.isValidUrl(value) ? value.trim() : '';
        Object.freeze(this);
    }

    /**
     * Returns the host of the URL, without protocol or path.
     *
     * @returns {string} The host of the URL, or an empty string when the URL is empty.
     */
    get host() {
        if (this.isEmpty()) return '';
        return new URL(this.#value).host;
    }

    /**
     * Indicates whether the value object holds no URL.
     *
     * @returns {boolean} True when the URL is empty.
     */
    isEmpty() {
        return this.#value === '';
    }

    /**
     * Returns the string representation of the URL.
     *
     * @returns {string} The wrapped URL.
     */
    toString() {
        return this.#value;
    }

    /**
     * Returns the primitive value of the URL.
     *
     * @returns {string} The wrapped URL.
     */
    valueOf() {
        return this.#value;
    }

    /**
     * Compares this value object with another one by value.
     *
     * @param {Url} other - The value object to compare against.
     * @returns {boolean} True when both value objects hold the same URL.
     */
    equals(other) {
        return other instanceof Url && this.#value === other.toString();
    }
}

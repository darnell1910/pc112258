/**
 * Value object for a URL. Invalid or missing values become an empty URL,
 * because many breweries in the catalog have no website.
 *
 * @author __AUTHOR_NAME__
 */
export class Url {
    /** @type {string} */
    #value;

    /**
     * Checks if a value can be parsed as a URL.
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isValidUrl(value) {
        if (typeof value !== 'string' && !(value instanceof String)) return false;
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * @param {string} [value='']
     */
    constructor(value = '') {
        this.#value = Url.isValidUrl(value) ? value.trim() : '';
        Object.freeze(this);
    }

    /**
     * Returns the host of the URL, without protocol or path.
     *
     * @returns {string}
     */
    getHost() {
        return this.isEmpty() ? '' : new URL(this.#value).host;
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return this.#value === '';
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.#value;
    }

    /**
     * @param {Url} other
     * @returns {boolean}
     */
    equals(other) {
        return other instanceof Url && this.#value === other.toString();
    }
}

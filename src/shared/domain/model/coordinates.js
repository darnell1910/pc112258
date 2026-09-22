/**
 * @summary Immutable value object that represents the geographic position of a brewery.
 * @remarks
 * Latitude and longitude are delivered by the Open Brewery DB API as strings and
 * may be absent, so they are converted to numbers and validated on creation.
 * @author __AUTHOR_NAME__
 */
export class Coordinates {
    /** @type {number|null} */
    #latitude;
    /** @type {number|null} */
    #longitude;

    /** The number of decimal places used when the coordinates are displayed. */
    static DISPLAY_PRECISION = 4;

    /**
     * Converts a candidate coordinate into a finite number.
     *
     * @param {*} value - The candidate coordinate.
     * @returns {number|null} The parsed coordinate, or null when it is not a finite number.
     */
    static #parse(value) {
        if (value === null || value === undefined || value === '') return null;
        const parsed = Number.parseFloat(value);
        return Number.isFinite(parsed) ? parsed : null;
    }

    /**
     * Creates a new Coordinates value object.
     *
     * @param {Object} [position={}] - The geographic position of the brewery.
     * @param {string|number} [position.latitude] - The latitude of the brewery.
     * @param {string|number} [position.longitude] - The longitude of the brewery.
     */
    constructor({ latitude = null, longitude = null } = {}) {
        this.#latitude = Coordinates.#parse(latitude);
        this.#longitude = Coordinates.#parse(longitude);
        Object.freeze(this);
    }

    /** @returns {number|null} The latitude of the position. */
    get latitude() {
        return this.#latitude;
    }

    /** @returns {number|null} The longitude of the position. */
    get longitude() {
        return this.#longitude;
    }

    /**
     * Indicates whether the geographic position is unknown.
     *
     * @returns {boolean} True when latitude or longitude is missing.
     */
    isEmpty() {
        return this.#latitude === null || this.#longitude === null;
    }

    /**
     * Returns the geographic position formatted for display.
     *
     * @returns {string} The position, for example '35.2574, -97.4682'.
     */
    toString() {
        if (this.isEmpty()) return '';
        const latitude = this.#latitude.toFixed(Coordinates.DISPLAY_PRECISION);
        const longitude = this.#longitude.toFixed(Coordinates.DISPLAY_PRECISION);
        return `${latitude}, ${longitude}`;
    }

    /**
     * Compares this value object with another one by value.
     *
     * @param {Coordinates} other - The value object to compare against.
     * @returns {boolean} True when both value objects hold the same position.
     */
    equals(other) {
        return other instanceof Coordinates
            && this.#latitude === other.latitude
            && this.#longitude === other.longitude;
    }
}

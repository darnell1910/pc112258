import { StringValidator } from '@/shared/domain/model/string-validator.js';

/**
 * @summary Immutable value object that represents a telephone number of the United States.
 * @remarks
 * The Open Brewery DB API delivers phone numbers as a plain digit sequence.
 * This value object keeps the digits as the canonical state and exposes a
 * human-friendly representation for the user interface.
 * @author __AUTHOR_NAME__
 */
export class PhoneNumber {
    /** @type {string} */
    #digits;

    /**
     * Creates a new PhoneNumber value object.
     *
     * @param {string} [value=''] - The raw phone number provided by the data source.
     */
    constructor(value = '') {
        this.#digits = StringValidator.isString(value) ? value.replace(/\D/g, '') : '';
        Object.freeze(this);
    }

    /**
     * Indicates whether the value object holds no phone number.
     *
     * @returns {boolean} True when no digit was supplied.
     */
    isEmpty() {
        return this.#digits === '';
    }

    /**
     * Returns the phone number formatted for display.
     *
     * @returns {string} The formatted phone number, for example '(405) 816-0490'.
     */
    toString() {
        if (this.isEmpty()) return '';
        if (this.#digits.length === 10)
            return `(${this.#digits.slice(0, 3)}) ${this.#digits.slice(3, 6)}-${this.#digits.slice(6)}`;
        if (this.#digits.length === 11 && this.#digits.startsWith('1'))
            return `+1 (${this.#digits.slice(1, 4)}) ${this.#digits.slice(4, 7)}-${this.#digits.slice(7)}`;
        return this.#digits;
    }

    /**
     * Returns the primitive value of the phone number.
     *
     * @returns {string} The digits of the phone number.
     */
    valueOf() {
        return this.#digits;
    }

    /**
     * Compares this value object with another one by value.
     *
     * @param {PhoneNumber} other - The value object to compare against.
     * @returns {boolean} True when both value objects hold the same digits.
     */
    equals(other) {
        return other instanceof PhoneNumber && this.#digits === other.valueOf();
    }
}

/**
 * Validation helpers for strings used across the domain.
 *
 * @author __AUTHOR_NAME__
 */
export class StringValidator {
    /**
     * Checks if a value is a string.
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }

    /**
     * Checks if a value is a string with at least one non-whitespace character.
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isNotEmptyString(value) {
        return StringValidator.isString(value) && value.trim().length > 0;
    }

    /**
     * Turns a technical value like 'brewery_type' into a readable 'Brewery Type'.
     *
     * @param {string} value
     * @returns {string}
     */
    static toHumanFriendlyLabel(value) {
        if (!StringValidator.isNotEmptyString(value)) return '';
        return value
            .trim()
            .replace(/[_-]+/g, ' ')
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
}

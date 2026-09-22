/**
 * @summary Domain utility that centralizes string-based validation rules.
 * @remarks
 * Keeping these checks in a single place prevents duplicated guard clauses
 * across entities and value objects of the domain layer.
 * @author __AUTHOR_NAME__
 */
export class StringValidator {
    /**
     * Determines whether a value is a string primitive or a String object.
     *
     * @param {*} value - The value to evaluate.
     * @returns {boolean} True when the value is a string, false otherwise.
     */
    static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }

    /**
     * Determines whether a value is a string holding at least one non-whitespace character.
     *
     * @param {*} value - The value to evaluate.
     * @returns {boolean} True when the value is a non-empty string, false otherwise.
     */
    static isNotEmptyString(value) {
        return StringValidator.isString(value) && value.trim().length > 0;
    }

    /**
     * Converts a technical identifier into a human-friendly label.
     *
     * @remarks
     * Replaces underscores and hyphens with spaces and capitalizes every word,
     * so provider values such as 'brewery_type' are displayed as 'Brewery Type'.
     *
     * @param {string} value - The technical identifier to humanize.
     * @returns {string} The human-friendly representation of the value.
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

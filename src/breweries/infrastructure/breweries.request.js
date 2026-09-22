/**
 * @summary Request object that describes a query sent to the breweries endpoint.
 * @remarks
 * Implements the Request pattern: the application layer expresses its intention
 * with attributes named in camelCase, while this object is the only place aware
 * of the query-string contract expected by the Open Brewery DB API.
 * @author __AUTHOR_NAME__
 */
export class BreweriesRequest {
    /** The page requested when the caller does not specify one. */
    static DEFAULT_PAGE = 1;
    /** The number of breweries requested when the caller does not specify one. */
    static DEFAULT_PER_PAGE = 20;
    /** The maximum number of breweries accepted by the provider in a single page. */
    static MAXIMUM_PER_PAGE = 200;

    /**
     * Creates a new BreweriesRequest.
     *
     * @param {Object} [criteria={}] - The criteria applied to the query.
     * @param {number} [criteria.page] - The one-based number of the requested page.
     * @param {number} [criteria.perPage] - The number of breweries expected per page.
     */
    constructor({ page = BreweriesRequest.DEFAULT_PAGE, perPage = BreweriesRequest.DEFAULT_PER_PAGE } = {}) {
        this.page = Math.max(1, Number.parseInt(page, 10) || BreweriesRequest.DEFAULT_PAGE);
        this.perPage = Math.min(
            BreweriesRequest.MAXIMUM_PER_PAGE,
            Math.max(1, Number.parseInt(perPage, 10) || BreweriesRequest.DEFAULT_PER_PAGE)
        );
    }

    /**
     * Translates the request into the query parameters expected by the provider.
     *
     * @returns {{page: number, per_page: number}} The query parameters of the request.
     */
    toQueryParameters() {
        return { page: this.page, per_page: this.perPage };
    }
}

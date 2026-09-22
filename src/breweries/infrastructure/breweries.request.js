/**
 * Query sent to the breweries endpoint.
 * Only this class knows the query string expected by the provider.
 *
 * @author __AUTHOR_NAME__
 */
export class BreweriesRequest {
    static DEFAULT_PAGE = 1;
    static DEFAULT_PER_PAGE = 20;
    static MAXIMUM_PER_PAGE = 200;

    /**
     * @param {Object} [criteria={}]
     * @param {number} [criteria.page]
     * @param {number} [criteria.perPage]
     */
    constructor({ page = BreweriesRequest.DEFAULT_PAGE, perPage = BreweriesRequest.DEFAULT_PER_PAGE } = {}) {
        this.page = Math.max(1, Number.parseInt(page, 10) || BreweriesRequest.DEFAULT_PAGE);
        this.perPage = Math.min(
            BreweriesRequest.MAXIMUM_PER_PAGE,
            Math.max(1, Number.parseInt(perPage, 10) || BreweriesRequest.DEFAULT_PER_PAGE)
        );
    }

    /**
     * @returns {{page: number, per_page: number}} the query parameters of the request.
     */
    toQueryParameters() {
        return { page: this.page, per_page: this.perPage };
    }
}

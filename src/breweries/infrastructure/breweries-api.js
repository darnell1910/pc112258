import axios from 'axios';
import { BreweriesRequest } from '@/breweries/infrastructure/breweries.request.js';
import { BreweriesResponse } from '@/breweries/infrastructure/breweries.response.js';
import { errorInterceptor } from '@/shared/infrastructure/error.interceptor.js';

const breweriesApiUrl = import.meta.env.VITE_BREWERIES_API_URL;
const breweriesEndpointPath = import.meta.env.VITE_BREWERIES_ENDPOINT_PATH;

/**
 * HTTP client configured to reach the Open Brewery DB API.
 *
 * @type {import('axios').AxiosInstance}
 */
const http = axios.create({ baseURL: breweriesApiUrl });
http.interceptors.response.use(errorInterceptor.onResponse, errorInterceptor.onError);

/**
 * @summary Infrastructure adapter that consumes the breweries endpoint of the Open Brewery DB API.
 * @remarks
 * The adapter is the only element of the solution aware of the transport
 * details. It receives Request objects and returns Response objects, so neither
 * axios nor the provider contract leaks into the application layer.
 * @author __AUTHOR_NAME__
 */
export class BreweriesApi {
    /**
     * Retrieves a page of breweries from the provider.
     *
     * @param {BreweriesRequest} [request=new BreweriesRequest()] - The criteria applied to the query.
     * @returns {Promise<BreweriesResponse>} A promise resolving to the assembled response object.
     */
    async getBreweries(request = new BreweriesRequest()) {
        const httpResponse = await http.get(breweriesEndpointPath, { params: request.toQueryParameters() });
        return BreweriesResponse.fromHttpResponse(httpResponse);
    }
}

import axios from 'axios';
import { BreweriesRequest } from '@/breweries/infrastructure/breweries.request.js';
import { BreweriesResponse } from '@/breweries/infrastructure/breweries.response.js';
import { errorInterceptor } from '@/shared/infrastructure/error.interceptor.js';

const breweriesApiUrl = import.meta.env.VITE_BREWERIES_API_URL;
const breweriesEndpointPath = import.meta.env.VITE_BREWERIES_ENDPOINT_PATH;

/** @type {import('axios').AxiosInstance} */
const http = axios.create({ baseURL: breweriesApiUrl });
http.interceptors.response.use(errorInterceptor.onResponse, errorInterceptor.onError);

/**
 * Client of the breweries endpoint of the Open Brewery DB API.
 * Receives a request object and returns a response object, so axios does not
 * leak into the application layer.
 *
 * @author __AUTHOR_NAME__
 */
export class BreweriesApi {
    /**
     * @param {BreweriesRequest} [request=new BreweriesRequest()]
     * @returns {Promise<BreweriesResponse>}
     */
    async getBreweries(request = new BreweriesRequest()) {
        const httpResponse = await http.get(breweriesEndpointPath, { params: request.toQueryParameters() });
        return BreweriesResponse.fromHttpResponse(httpResponse);
    }
}

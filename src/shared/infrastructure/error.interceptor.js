/**
 * Axios response interceptor. Turns any HTTP failure into a single readable
 * message, so the rest of the application does not deal with axios errors.
 *
 * @author __AUTHOR_NAME__
 */
export const errorInterceptor = {
    /**
     * @param {import('axios').AxiosResponse} response
     * @returns {import('axios').AxiosResponse}
     */
    onResponse: response => response,

    /**
     * @param {import('axios').AxiosError} error
     * @returns {Promise<never>} rejected with the resulting message.
     */
    onError: error => {
        let message;

        if (error.response) {
            console.error('Status:', error.response.status, 'Data:', error.response.data);
            message = error.response.data?.message ?? `Error ${error.response.status}: ${error.response.statusText}`;
        } else if (error.request) {
            console.error('Request:', error.request);
            message = 'No response received from the server. Please check your internet connection.';
        } else {
            console.error('Error Message:', error.message);
            message = error.message;
        }

        return Promise.reject(message);
    }
};

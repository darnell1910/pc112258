/**
 * @summary Axios response interceptor that centralizes the error handling of the application.
 * @remarks
 * Every HTTP failure is translated into a single, user-oriented message, so the
 * application layer never has to inspect transport-specific error structures.
 * @author __AUTHOR_NAME__
 */
export const errorInterceptor = {
    /**
     * Forwards a successful response without modifying it.
     *
     * @param {import('axios').AxiosResponse} response - The successful HTTP response.
     * @returns {import('axios').AxiosResponse} The same HTTP response.
     */
    onResponse: response => response,

    /**
     * Translates a failed request into a rejected promise carrying a readable message.
     *
     * @param {import('axios').AxiosError} error - The error raised by the HTTP client.
     * @returns {Promise<never>} A rejected promise holding the resulting message.
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

import { Url } from '@/shared/domain/model/url.js';

const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const publishableApiKey = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

/**
 * @summary Infrastructure adapter that builds image URLs served by the Logo.dev Logo API.
 * @remarks
 * The adapter isolates the external branding provider from the rest of the
 * application, so a different logo service could be plugged in without changing
 * the domain, application or presentation layers.
 * @author __AUTHOR_NAME__
 */
export class LogoDevApi {
    /** The default width, in pixels, requested to the Logo.dev Logo API. */
    static DEFAULT_SIZE = 240;

    /**
     * Builds the URL of the logo associated with a domain.
     *
     * @param {string} domain - The domain whose logo is requested, for example 'openbrewerydb.org'.
     * @param {number} [size=LogoDevApi.DEFAULT_SIZE] - The requested width of the image, in pixels.
     * @returns {string} The logo URL, or an empty string when no domain is supplied.
     */
    getUrlToLogoForDomain(domain, size = LogoDevApi.DEFAULT_SIZE) {
        if (!domain) return '';
        return `${logoApiUrl}/${domain}?token=${publishableApiKey}&size=${size}&format=png`;
    }

    /**
     * Builds the URL of the logo associated with a website.
     *
     * @param {Url} websiteUrl - The website of the organization whose logo is requested.
     * @param {number} [size=LogoDevApi.DEFAULT_SIZE] - The requested width of the image, in pixels.
     * @returns {string} The logo URL, or an empty string when the website is unknown.
     */
    getUrlToLogo(websiteUrl, size = LogoDevApi.DEFAULT_SIZE) {
        if (!(websiteUrl instanceof Url) || websiteUrl.isEmpty()) return '';
        return this.getUrlToLogoForDomain(websiteUrl.host, size);
    }
}

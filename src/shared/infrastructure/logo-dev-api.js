import { Url } from '@/shared/domain/model/url.js';

const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const publishableApiKey = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

/**
 * Builds the image URLs served by the Logo.dev Logo API.
 *
 * @author __AUTHOR_NAME__
 */
export class LogoDevApi {
    static DEFAULT_SIZE = 240;

    /**
     * @param {string} domain - for example 'openbrewerydb.org'.
     * @param {number} [size=LogoDevApi.DEFAULT_SIZE]
     * @returns {string}
     */
    getUrlToLogoForDomain(domain, size = LogoDevApi.DEFAULT_SIZE) {
        if (!domain) return '';
        return `${logoApiUrl}/${domain}?token=${publishableApiKey}&size=${size}&format=png`;
    }

    /**
     * @param {Url} websiteUrl
     * @param {number} [size=LogoDevApi.DEFAULT_SIZE]
     * @returns {string} empty when the website is unknown.
     */
    getUrlToLogo(websiteUrl, size = LogoDevApi.DEFAULT_SIZE) {
        if (!(websiteUrl instanceof Url) || websiteUrl.isEmpty()) return '';
        return this.getUrlToLogoForDomain(websiteUrl.getHost(), size);
    }
}

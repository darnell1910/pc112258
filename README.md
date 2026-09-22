# Open Breweries DB

Web application that shows the catalog of breweries and taprooms of the United States published by
[Open Brewery DB](https://www.openbrewerydb.org/). The breweries are retrieved from the public API of the provider and
displayed as cards, and the logo of each brewery is resolved with the [Logo.dev](https://logo.dev) Logo API.

The project is organized with a domain-driven approach, using layered and component-based architecture.

## Features

- Retrieves the breweries from the Open Brewery DB API and shows them in the `Brewery List` view.
- Each brewery is a card with its logo on top, the name as title, the website as subtitle and the rest of the
  information as content, with readable labels instead of the technical names of the API.
- Two cards per row on tablet and desktop, one per row on phones.
- `Go to Website` opens the website of the brewery in a new tab.
- `Share Information` shares the brewery with the browser, and copies the link to the clipboard when the browser does
  not support sharing.
- English and Spanish, switched from the toolbar. English is the default language.
- ARIA attributes in the views, and the `lang` attribute of the page follows the selected language.

## Technologies

JavaScript, Vue 3.5 with Composition API, Vite, PrimeVue with the Material theme, PrimeIcons, PrimeFlex, Axios and
Vue I18n.

## Dependencies

- `vue` ^3.5.43
- `primevue` ^5.0.1 and `@primeuix/themes` ^3.0.1
- `primeicons` ^8.0.1
- `primeflex` ^4.0.0
- `axios` ^1.20.0
- `vue-i18n` ^11.4.12
- `vite` ^8.3.0 and `@vitejs/plugin-vue` ^6.0.8 as development dependencies

## How to run it

```bash
npm install
cp .env.example .env.development
npm run dev
```

Then open the URL printed by Vite, usually `http://localhost:5173`.

Other scripts: `npm run build` creates the production build in `dist`, and `npm run preview` serves that build.

## Environment variables

The keys are read from `.env.development` in development and from `.env.production` in the build. Copy `.env.example`
and fill in your own values. These files are not committed, so no key ends up in the repository.

- `VITE_BREWERIES_API_URL` and `VITE_BREWERIES_ENDPOINT_PATH`: the Open Brewery DB API.
- `VITE_LOGO_API_URL` and `VITE_LOGO_PUBLISHABLE_API_KEY`: the Logo.dev Logo API.
- `VITE_APPLICATION_LOGO_DOMAIN`: domain used for the logo of the application.
- `VITE_PRIME_UI_LICENSE_KEY`: license of PrimeVue.

## Structure

```text
src/
  breweries/
    domain/model/             brewery.entity.js
    application/              brewery.store.js
    infrastructure/           breweries-api.js, request, resource, response, assembler
    presentation/views/       brewery-list.vue
    presentation/components/  brewery-item.vue, brewery-information.vue
  shared/
    domain/model/             url.js, string-validator.js
    infrastructure/           logo-dev-api.js, error.interceptor.js
    presentation/components/  layout, toolbar, footer, language switcher
  locales/                    en.json, es.json
```

The domain holds the `Brewery` entity and the `Url` value object. The application layer has `breweryStore`, which
coordinates the use cases and keeps the state used by the views. The infrastructure layer talks to the external
services, and the presentation layer has the Vue components.

The patterns used in the infrastructure layer are Request (`BreweriesRequest`, builds the query parameters), Resource
(`BreweryResource`, a copy of the JSON of the provider with its original snake_case names), Response
(`BreweriesResponse`, gives shape to the array returned by the API) and Assembler (`BreweryAssembler`, maps resources to
entities and adds the logo).

## Credits

Data from [Open Brewery DB](https://www.openbrewerydb.org/) and logos from [Logo.dev](https://logo.dev).

## Author

__AUTHOR_FIRST_NAME__ __AUTHOR_LAST_NAME__ - `__AUTHOR_CODE__`
1ASI0730 Aplicaciones Web, NRC 12258.

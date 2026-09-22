# Open Breweries DB

Open Breweries DB is a web application that promotes the catalog of breweries and taprooms of the United States
published by [Open Brewery DB](https://www.openbrewerydb.org/). The application retrieves the breweries from the public
API of the provider and presents them as a responsive collection of cards, with the branding of every brewery resolved
through the [Logo.dev Logo API](https://logo.dev).

The solution is organized with a domain-driven approach, applying layered and component-based architecture,
object-oriented programming and well-known design patterns.

## Features

- **Brewery catalog**: retrieves the breweries from the Open Brewery DB API and presents them in the `Brewery List`
  view.
- **Brewery cards**: every brewery is displayed as a card showing its logo on top, its name as the title, its website as
  the subtitle and the remaining information as the content, described with human-friendly labels.
- **Two cards per row**: the grid shows two cards per row on medium screens and wider, and a single card per row on
  small screens.
- **Brand resolution**: the logo of every brewery is obtained from the Logo.dev Logo API using the website of the
  brewery, with a graceful fallback when no logo is available.
- **Go to Website**: opens the website of the brewery in a new browser tab.
- **Share Information**: shares the brewery through the share capability of the browser, and copies the information to
  the clipboard when that capability is not available.
- **Internationalization**: the whole interface is available in English, the default language, and Spanish. The language
  is switched from the select buttons of the toolbar and is applied to every fixed text of the interface.
- **Accessibility**: the views declare ARIA attributes, landmark regions and live regions, and the `lang` attribute of
  the document follows the selected language.
- **Responsive Web Design**: the layout adapts from mobile to desktop screens using the PrimeFlex grid system.

## Technology Stack

- **Language**: JavaScript
- **Framework**: Vue 3.5 (Composition API with `<script setup>`)
- **Build tool**: Vite
- **UI components**: PrimeVue (Material theme) and PrimeIcons
- **CSS utilities**: PrimeFlex
- **HTTP client**: Axios
- **Internationalization**: Vue I18n

## Dependencies

| Dependency          | Version   | Purpose                                             |
|---------------------|-----------|-----------------------------------------------------|
| `vue`               | `^3.5.43` | Progressive framework used to build the interface.  |
| `primevue`          | `^5.0.1`  | Library of user interface components.               |
| `@primeuix/themes`  | `^3.0.1`  | Material theme preset applied to PrimeVue.          |
| `primeicons`        | `^8.0.1`  | Icon set used across the interface.                 |
| `primeflex`         | `^4.0.0`  | CSS utilities and responsive grid system.           |
| `axios`             | `^1.20.0` | HTTP client used to consume the external API.       |
| `vue-i18n`          | `^11.4.12`| Internationalization of the user interface.         |
| `vite`              | `^8.3.0`  | Development server and production bundler.          |
| `@vitejs/plugin-vue`| `^6.0.8`  | Vite plugin that compiles Vue single-file components.|

## Prerequisites

- Node.js (LTS version recommended)
- npm

## Getting Started

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create the environment file from the provided template and fill in your own keys:

   ```bash
   cp .env.example .env.development
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available Scripts

- `npm run dev`: starts the development server.
- `npm run build`: generates the production build in the `dist` folder.
- `npm run preview`: serves the production build locally.

## Environment Variables

The application reads its settings from Vite environment variables. Copy `.env.example` as `.env.development`, used by
the development server, and as `.env.production`, used by production builds, and fill in your own keys. A `.env.local`
file can be created to override any value locally. The environment files are excluded from version control, so no key is
ever committed.

| Variable                        | Description                                              |
|---------------------------------|----------------------------------------------------------|
| `VITE_BREWERIES_API_URL`        | Base URL of the Open Brewery DB API.                      |
| `VITE_BREWERIES_ENDPOINT_PATH`  | Path of the breweries endpoint.                           |
| `VITE_LOGO_API_URL`             | Base URL of the Logo.dev Logo API.                        |
| `VITE_LOGO_PUBLISHABLE_API_KEY` | Publishable API key of the Logo.dev Logo API.             |
| `VITE_APPLICATION_LOGO_DOMAIN`  | Domain used to resolve the logo of the application.       |
| `VITE_PRIME_UI_LICENSE_KEY`     | License key of the Prime UI component library.            |

## Project Structure

```text
src/
  breweries/                  # Breweries sub-domain
    domain/model/             # Brewery entity
    application/              # Application service and reactive state
    infrastructure/           # API adapter, request, resource, response and assembler
    presentation/
      views/                  # Brewery List view
      components/             # Brewery card and brewery details
  shared/                     # Shared sub-domain
    domain/model/             # Value objects: Url, Address, PhoneNumber, Coordinates
    infrastructure/           # Logo.dev adapter and error interceptor
    presentation/components/  # Layout, toolbar, footer, language switcher
  locales/                    # Translation dictionaries (en, es)
```

## Architecture

The solution follows a domain-driven organization with four layers per sub-domain:

- **Domain**: holds the `Brewery` entity and the value objects `Url`, `Address`, `PhoneNumber` and `Coordinates`. The
  entities are self-validating and immune to the naming conventions of the external provider.
- **Application**: exposes `breweryStore`, the application service that orchestrates the use cases and publishes the
  reactive state consumed by the interface.
- **Infrastructure**: concentrates the communication with the external services and the translation of their contracts.
- **Presentation**: contains the Vue views and components.

### Design Patterns

- **Request**: `BreweriesRequest` expresses the query criteria and is the only element aware of the query-string
  contract of the provider.
- **Resource**: `BreweryResource` mirrors the representation published by the API, preserving its original naming.
- **Response**: `BreweriesResponse` gives an explicit shape to the payload returned by the API.
- **Assembler**: `BreweryAssembler` maps resources into domain entities and enriches them with the resolved logo.

## Attribution

This application consumes data and branding services provided by:

- [Open Brewery DB](https://www.openbrewerydb.org/)
- [Logo.dev](https://logo.dev)

## Author

- **Code**: `__AUTHOR_CODE__`
- **Name**: __AUTHOR_FIRST_NAME__ __AUTHOR_LAST_NAME__
- **Course**: 1ASI0730 - Aplicaciones Web (NRC 12258)

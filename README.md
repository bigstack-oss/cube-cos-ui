# CubeCOS UI

## Repository Structure

The repository follows the monorepo approach. Projects share the common utilities and the UI library.

- [cube-frontend-utils](./packages/cube-frontend-utils/): The helper functions.
- [cube-frontend-i18n](./packages/cube-frontend-i18n/): The i18n resources and parsing scripts .
  - [README](./packages/cube-frontend-i18n/docs/README.md)
- [cube-frontend-ui-theme](./packages/cube-frontend-ui-theme/): The shared UI theme.
- [cube-frontend-ui-library](./packages/cube-frontend-ui-library/): The shared UI components.
- [cube-frontend-api](./packages/cube-frontend-api/): The API SDK generator with the submodule `cube-cos-openapi` pointing to [cube-cos-openapi](https://github.com/bigstack-oss/cube-cos-openapi).
  - [README](./packages/cube-frontend-api/README.md)
- [cube-frontend-web-app](./packages/cube-frontend-web-app/): The project to build RPM `cube-cos-ui` as the main UI of CubeCOS v3.0.0.
  - [README](./packages/cube-frontend-web-app/README.md)
  - [COS API Request Hooks](./packages/cube-frontend-web-app/docs/cos-api-request-hooks.md)
  - [rpm](./packages/cube-frontend-web-app/docs/rpm.md)
- [cube-frontend-keycloak-login](./packages/cube-frontend-keycloak-login/): The project to build RPM `cube-cos-login` for the SSO login of CubeCOS v3.0.0 based on Keycloak.
  - [README](./packages/cube-frontend-keycloak-login/README.md)
  - [rpm](./packages/cube-frontend-keycloak-login/docs/rpm.md)

## Development

### Prerequisites

- Node.js 22.17.0 (You can run `nvm use` to switch to the Node.js version used by `cube-cos-ui`, if you have [nvm](https://github.com/nvm-sh/nvm) installed.)
- npm
- pnpm v10

### Set Up

```bash
pnpm install
```

#### cube-cos-ui

```bash
# dev
pnpm web-app:dev

# build
pnpm web-app:build
```

#### cube-cos-login

```bash
# dev
pnpm keycloak-login:dev

# build
pnpm keycloak-login:infra
pnpm keycloak-login:build
pnpm keycloak-login:copy-output
```

## Community

- [License](./LICENSE)
- [Contributing](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security](./SECURITY.md)

## License

Copyright (c) 2025 [Bigstack co., ltd](https://bigstack.co/)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

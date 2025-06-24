# COS UI Web APP

## Development Setup

### 1. Generate COS API Typescript SDK

Please see [COS API Typescript SDK](../cube-frontend-api/README.md).

### 2. Configure Local Credentials for Protected API Access

In the local dev environment, it's impossible to integrate our login flow since our Keycloak instance is in staging environment, After a successful login, it will only redirect to the staging COS UI.

Therefore, in the local dev environment, we need to call the `getToken` API using a username, password and data center to obtain an access token for accessing protected APIs.

Copy the `.env.local.example` file to `.env.local` (which is git-ignored) and fill in all properties.

**DO NOT** put the username and password in any other files.

### 3. Deploy Local COS UI to Remote Dev Server

The `pnpm deploy-dev` command is designed to allow frontend developers to quickly test features or fixes on remote dev hosts.

1. Copy the `./scripts/remote_hosts.properties.example` file to `./scripts/remote_hosts.properties.local` (which is git-ignored) and fill in all properties.
2. Run `pnpm deploy-dev`. This command will build the web-app to `/dist` folder and use `scp` to deploy it to the specified dev hosts.

## How to Use COS API Request Hooks

Please see [COS API Request Hooks](./docs/cos-api-request-hooks.md).

# COS UI Web APP

## Development

### How to use COS API Typescript SDK

Please see [COS API Typescript SDK](../cube-frontend-api/README.md).

### How to Access Protected API

In the local dev environment, It's impossible to integrate our login flow since our Keycloak instance is in staging environment, After a successful login, it will only redirect to the staging COS UI.

Therefore, in the local dev environment, we need to call the `getToken` API using a username, password and data center to obtain an access token for accessing protected APIs.

Create a `.env.local`(which is git-ignored) and fill in the values:

```sh
VITE_API_SERVER=YOUR_API_SERVER
VITE_USERNAME=YOUR_USERNAME
VITE_PASSWORD=YOUR_PASSWORD
VITE_DATA_CENTER=YOUR_DATA_CENTER
```

**DO NOT** put the username and password in any other files.

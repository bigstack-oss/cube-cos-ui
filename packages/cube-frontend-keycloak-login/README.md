# Previewing the Keycloak Login Page Locally

This guide explains how to preview the Keycloak login page in your local environment.

## 1. Development

Run:

```sh
pnpm keycloak-login:dev
```

Visit http://localhost:5173 to begin development. Once you're done, move on to the next step.

## 2. Starting the Keycloak Server

Run:

```sh
pnpm keycloak-login:infra
```

Wait a few minutes for the container to initialize. Once it's ready, you should see the Keycloak Welcome page at http://localhost:8642/auth.

Be aware of a [known issue](https://github.com/docker/for-win/issues/584#issuecomment-286792858) in Docker: host-mount volumes won't be available for containers that auto-start in detached mode (`-d`) after host reboot (i.e., restarting your computer). To work around this, you need to restart the container after every host reboot.

## 3. Building the React App

Run:

```sh
pnpm keycloak-login:build
```

This builds the React app and outputs files in a way Keycloak expects.

## 4. Copy the Output Files to Keycloak

Run:

```sh
pnpm keycloak-login:copy-output
```

This copies the generated files to `packages/cube-frontend-keycloak-login/keycloak/themes/cos-ui/login/resources`, which is mounted to the Keycloak container. This allows Keycloak to load the custom theme.

## 5. Viewing the COS Login Page

`docker-compose.yaml` sets `KC_SPI_THEME_DEFAULT=cos-ui`, so the preview container serves
`cos-ui` without anyone having to change a realm setting first. Just log out and you should
see the COS login page.

That option is a server-wide default covering every theme type, and this package only ships
a `login` theme, so the welcome, admin and account pages fall back to the built-in theme and
log a `Failed to find WELCOME theme cos-ui` error. Harmless for a local preview.

CubeCOS does **not** deploy it that way — it sets the theme as the master realm's login
theme instead, so only the login page is affected and nothing logs a fallback error (see
bigstack-oss/cubecos#187). To mirror that locally, drop `KC_SPI_THEME_DEFAULT` from
`docker-compose.yaml` and set the theme per realm:

1. Log in to the Keycloak Admin Console at http://localhost:8642/auth/admin using `admin/admin`.
2. In **Master** Realm -> **Realm Settings**, open the **Themes** tab.
3. Change Login Theme from `Select one...` to `cos-ui`, then click **Save**.

## Folder Structure

- `keycloak/`
  - `themes/`
    - `cos-ui/`: Custom theme for COS UI 3.0. Only a `login` theme is provided. For
      reference, the built-in themes are shipped inside the container's
      `/opt/keycloak/lib/lib/main/org.keycloak.keycloak-themes-*.jar`, and custom themes are
      mounted under `/opt/keycloak/themes/`.
- `src/`: Source code for the Login page React application.

## Keycloak Version

The base image version lives in `KEYCLOAK_VERSION`, which `core/keycloak/Makefile` in the
`cubecos` repo reads to build the login RPM. `docker-compose.yaml` pins the same version for
local previews — keep the two in step.

Since Keycloak 18 the server runs on Quarkus rather than WildFly, which is why:

- themes live under `/opt/keycloak/themes/` rather than `/opt/jboss/keycloak/themes/`,
- the admin user comes from `KEYCLOAK_ADMIN` / `KEYCLOAK_ADMIN_PASSWORD` rather than
  `KEYCLOAK_USER` / `KEYCLOAK_PASSWORD`,
- the default theme comes from `KC_SPI_THEME_DEFAULT` rather than `KEYCLOAK_DEFAULT_THEME`,
- theme caching is off automatically under `start-dev`, so the `standalone.xml` and
  `standalone-ha.xml` overrides this package used to carry are gone.

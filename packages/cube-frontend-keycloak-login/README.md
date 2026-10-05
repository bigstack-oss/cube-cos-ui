# Previewing the Keycloak Login Page Locally

This guide explains how to preview the Keycloak login page in your local environment.

## 1. Development

Run:

```sh
pnpm keycloak-login:dev
```

Visit http://localhost:5173 to begin development. Once you're done, move on to the next step.

The theme renders four Keycloak pages, and each `.ftl` tells the React app which one it is
through `pageId`. In development, pick the page with `?page=<pageId>`:

| Page                                              | `.ftl`                      | Extra flags               |
| ------------------------------------------------- | --------------------------- | ------------------------- |
| http://localhost:5173                             | `login.ftl`                 |                           |
| http://localhost:5173/?page=login-otp             | `login-otp.ftl`             | `devices`, `errors`       |
| http://localhost:5173/?page=login-config-totp     | `login-config-totp.ftl`     | `manual`, `aia`, `errors` |
| http://localhost:5173/?page=login-update-password | `login-update-password.ftl` | `aia`, `errors`           |

`devices` shows two OTP devices, `manual` the "Unable to scan?" mode, `aia` the Cancel button
of an action the user started from the account console, and `errors` Keycloak's field errors.
The mocks live in `src/keycloakLoginContextSetupDev.ts`.

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

`docker-compose.yaml` sets `KC_SPI_THEME__DEFAULT=cos-ui`, so the preview container serves
`cos-ui` without anyone having to change a realm setting first. Just log out and you should
see the COS login page.

That option is a server-wide default covering every theme type, and this package only ships
a `login` theme, so the welcome, admin and account pages fall back to the built-in theme and
log a `Failed to find WELCOME theme cos-ui` error. On Keycloak 22 and 26 the account and admin
consoles answer 500 instead, so after a local login the redirect lands on an error page — the
login pages themselves are unaffected.

CubeCOS does **not** deploy it that way — it sets the theme as the master realm's login
theme instead, so only the login page is affected and nothing logs a fallback error (see
bigstack-oss/cubecos#187). To mirror that locally, drop `KC_SPI_THEME__DEFAULT` from
`docker-compose.yaml` and set the theme per realm:

1. Log in to the Keycloak Admin Console at http://localhost:8642/auth/admin using `admin/admin`.
2. In **Master** Realm -> **Realm Settings**, open the **Themes** tab.
3. Change Login Theme from `Select one...` to `cos-ui`, then click **Save**.

## 6. Walking the OTP and Password Pages

Keycloak shows `login-config-totp`, `login-update-password` and `login-otp` only to a user
with required actions or an OTP device, and the admin console answers 500 under
`KC_SPI_THEME__DEFAULT` (see step 5). Create the user with `kcadm.sh` inside the container
instead:

```sh
kc() { docker exec keycloak /opt/keycloak/bin/kcadm.sh "$@"; }
kc config credentials --server http://localhost:8080/auth --realm master --user admin --password admin
# Docker forwards the browser's requests from a bridge address, which master's default
# sslRequired=external treats as remote, so the login page answers "HTTPS required".
kc update realms/master -s sslRequired=NONE
kc create users -r master -s username=t317 -s enabled=true -s firstName=T317 -s lastName=Test \
  -s email=t317@example.invalid -s emailVerified=true -s 'requiredActions=["CONFIGURE_TOTP"]'
kc set-password -r master --username t317 --new-password Temp-317 --temporary
```

Then open the login flow. `account-console` is a public client that requires PKCE, so a
plain authorization URL fails with `Missing parameter: code_challenge_method`. The code is
never exchanged, so any valid S256 challenge works:

```text
http://localhost:8642/auth/realms/master/protocol/openid-connect/auth?client_id=account-console&redirect_uri=http%3A%2F%2Flocalhost%3A8642%2Fauth%2Frealms%2Fmaster%2Faccount%2F&response_type=code&scope=openid&code_challenge_method=S256&code_challenge=Bu9iYvjUK9ms4soGQmlTmYstPqmdfdx6eHY_8l7U97U
```

Log in as `t317` / `Temp-317`: you get the OTP setup page, then the password update. Log out
and in again for the OTP prompt. For the Cancel button of an action the user started
(`cancel-aia`), stay logged in and append `&kc_action=CONFIGURE_TOTP` or
`&kc_action=UPDATE_PASSWORD` to the same URL; Cancel returns with `kc_action_status=cancelled`.
Running the `CONFIGURE_TOTP` action again adds a second device, which turns on the device
selector on the OTP prompt.

Clean up with `kc delete users/$(kc get users -r master -q username=t317 --fields id --format csv --noquotes) -r master`.

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
- the admin user comes from `KC_BOOTSTRAP_ADMIN_USERNAME` / `KC_BOOTSTRAP_ADMIN_PASSWORD`
  (since 26; 18 to 25 used `KEYCLOAK_ADMIN` / `KEYCLOAK_ADMIN_PASSWORD`) rather than
  `KEYCLOAK_USER` / `KEYCLOAK_PASSWORD`,
- the default theme comes from `KC_SPI_THEME__DEFAULT` (`KC_SPI_THEME_DEFAULT` before 26)
  rather than `KEYCLOAK_DEFAULT_THEME`,
- theme caching is off automatically under `start-dev`, so the `standalone.xml` and
  `standalone-ha.xml` overrides this package used to carry are gone.

# Previewing the Keycloak Login Page Locally

This guide explains how to preview the Keycloak login page in your local environment.

## Starting the Keycloak Server

Run:

```sh
pnpm keycloak-login:infra
```

Wait a few minutes for the container to start. Once it's ready, visit http://localhost:8642 to access the Keycloak Welcome page.

## Building the React App

Run:

```sh
pnpm keycloak-login:build
```

This builds the React app and generates output files in a format Keycloak expects.

The generated files will also be copied to `packages/cube-frontend-keycloak-login/keycloak/themes/cos-ui/login/resources`, allowing Keycloak to load the custom theme.

## Changing the Login Theme

1. Log in to the Keycloak Admin Console at http://localhost:8642/auth/admin using `admin/admin`.
2. In **Master** Realm -> **Realm Settings**, open the **Themes** tab.
3. Change Login Theme from `Select one...` to `cos-ui`, then click **Save**.
4. Log out, and you should see the COS login page.

## Folder Structure

- `keycloak/`
  - `standalone/configuration/`: Configuration files to override Keycloak's default theme cache for real-time updates.
  - `themes/`:
    - `base/`: Default Keycloak theme for DEV reference.
    - `cos-ui/`: Custom theme for COS UI 3.0.

# Keycloak Login Page Development Guide

## How to Run

1. Run `pnpm keycloak-login:infra` and wait for the container to start.
   - Once it's ready, open http://localhost:8642 to access the Keycloak Welcome page.
2. WIP

## Changing the Login Theme

1. Log in to the Keycloak Administration Console at http://localhost:8642/auth/admin using `admin/admin`.
2. In **Master** Realm -> **Realm Settings**, go to the **Themes** tab.
3. Change the **Login Theme** from the default `Select one...` to `cos-ui`, then click **Save**.
4. Log out, and you should see the COS login page.

## Folder Structure

- `keycloak/`
  - `standalone/configuration/`: Configuration files to override Keycloak's default theme cache for real-time updates.
  - `themes/`:
    - `base/`: Default Keycloak theme.
    - `cos-ui/`: Custom theme for COS UI 3.0.

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

Wait a few minutes for the container to initialize. Once it's ready, you should see the Keycloak Welcome page at http://localhost:8642.

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

## 5. Changing the Login Theme

1. Log in to the Keycloak Admin Console at http://localhost:8642/auth/admin using `admin/admin`.
2. In **Master** Realm -> **Realm Settings**, open the **Themes** tab.
3. Change Login Theme from `Select one...` to `cos-ui`, then click **Save**.
4. Log out, and you should see the COS login page.

## Folder Structure

- `keycloak/`
  - `standalone/`: Configuration files to override Keycloak's default theme cache for real-time updates.
  - `themes/`:
    - `cos-ui/`: Custom theme for COS UI 3.0. For reference, the default theme files can be found in the container at `/opt/jboss/keycloak/themes/base`.
- `src/`: Source code for the Login page React application.

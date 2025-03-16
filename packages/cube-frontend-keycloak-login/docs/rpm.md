# Build & Deploy RPM

## Env

```bash
VERSION=$(node -p "require('./packages/cube-frontend-keycloak-login/package.json').version")
BUILD_NUMBER=$(git rev-parse --short HEAD)
KEYCLOAK_VERSION=$(head -n 1 ./packages/cube-frontend-keycloak-login/KEYCLOAK_VERSION)
```

## Install Dependencies

- Node.js
- npm
- pnpm
- buildah

```bash
dnf module install nodejs:22/common
npm install -g pnpm@latest-10
sudo dnf install buildah
```

## Prepare Environment

### Dev Tools

```bash
sudo dnf install -y rpmdevtools rpmlint
```

### Directory

```bash
rm -rf ~/rpmbuild
pushd ~
mkdir rpmbuild
cd rpmbuild
mkdir BUILD RPMS SOURCES SPECS SRPMS
popd
```

## Build

### Tarball Source Code

```bash
mkdir ~/source
mkdir -p ~/source/packages/cube-frontend-ui-library
pushd ./packages/cube-frontend-ui-library
cp -r ./src package.json postcss.config.js tailwind.config.js tsconfig.json vite.config.ts ~/source/packages/cube-frontend-ui-library
popd
mkdir -p ~/source/packages/cube-frontend-ui-theme
pushd ./packages/cube-frontend-ui-theme
cp -r ./src package.json tsconfig.json ~/source/packages/cube-frontend-ui-theme
popd
mkdir -p ~/source/packages/cube-frontend-utils
pushd ./packages/cube-frontend-utils
cp -r ./src package.json tsconfig.json ~/source/packages/cube-frontend-utils
popd
mkdir -p ~/source/packages/cube-frontend-keycloak-login
pushd ./packages/cube-frontend-keycloak-login
cp -r ./public ./rollup-plugins ./src index.html package.json postcss.config.js tailwind.config.js tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts ~/source/packages/cube-frontend-keycloak-login
popd
mkdir -p ~/source/packages/cube-frontend-keycloak-login/keycloak
pushd ./packages/cube-frontend-keycloak-login/keycloak
cp -r ./themes ~/source/packages/cube-frontend-keycloak-login/keycloak
popd
cp -r LICENSE package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ~/source
pushd ~
tar -cvzf "cube-cos-login-${VERSION}.tar.gz" source
mv "cube-cos-login-${VERSION}.tar.gz" ~/rpmbuild/SOURCES
rm -r source/
popd
```

### Spec file

- [cube-cos-login.spec](../cube-cos-login.spec)

```bash
cp ./packages/cube-frontend-keycloak-login/cube-cos-login.spec ~/rpmbuild/SPECS
rpmlint ~/rpmbuild/SPECS/cube-cos-login.spec
```

### Build

```bash
rpmbuild -bb --nodeps --define "version $VERSION" --define "build_number $BUILD_NUMBER" --define "keycloak_version $KEYCLOAK_VERSION" ~/rpmbuild/SPECS/cube-cos-login.spec
```

### Output

- built rpm would be under ~/rpmbuild/RPMS/x86_64

```bash
ls -ahl ~/rpmbuild/RPMS/x86_64/cube-cos-login-$VERSION-1.el9.$BUILD_NUMBER.x86_64.rpm
```

## Deploy RPM

1. Send the built rpm to a running CubeCOS

```bash
scp "<path of rpm>" "<user>@<cubecos>:<path to place rpm>"
```

2. Install the rpm

```bash
dnf install "<path to cube-cos-login rpm>"
```

3. Remove the old Keycloak image

```bash
skopeo delete --tls-verify=false --creds "username:password" docker://localhost:5080/bigstack/keycloak:17.0.1-legacy
```

```bash
docker exec -it "<docker registry container id>" shrm -r /var/lib/registry/docker/registry/v2/repositories/bigstack/keycloak
```

4. Import the image

```bash
podman load -i /usr/share/cube/login/keycloak-image.tar
```

5. Push the image to the local private registry

```bash
podman push --tls-verify=false localhost:5080/bigstack/keycloak:17.0.1-legacy
```

6. Force helm to pull the new image

/opt/keycloak/chart-values.yaml

```diff
image:
  repository: localhost:5080/bigstack/keycloak
+  pullPolicy: Always
```

7. Clean up

```bash
dnf remove cube-cos-login
```

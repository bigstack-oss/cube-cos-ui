# Build RPM

## Env

```bash
VERSION=$(node -p "require('./packages/cube-frontend-web-app/package.json').version")
BUILD_NUMBER=$(git rev-parse --short HEAD)
```

## Install Dependencies

- Node.js
- npm
- pnpm

```bash
dnf module install nodejs:22/common
npm install -g pnpm@latest-10
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
mkdir -p ~/source/packages/cube-frontend-api
pushd ./packages/cube-frontend-api
cp -r package.json tsconfig.json ~/source/packages/cube-frontend-api
mkdir -p ~/source/packages/cube-frontend-api/sdk
cd ./sdk
cp api.ts base.ts common.ts configuration.ts index.ts ~/source/packages/cube-frontend-api/sdk
popd
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
mkdir -p ~/source/packages/cube-frontend-web-app
pushd ./packages/cube-frontend-web-app
cp -r ./public ./src index.html package.json postcss.config.js tailwind.config.js tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts ~/source/packages/cube-frontend-web-app
popd
cp -r LICENSE package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ~/source
pushd ~
tar -cvzf "cube-cos-ui-${VERSION}.tar.gz" source
mv "cube-cos-ui-${VERSION}.tar.gz" ~/rpmbuild/SOURCES
rm -r source/
popd
```

### Spec file

- [cube-cos-ui.spec](../cube-cos-ui.spec)

```bash
cp ./packages/cube-frontend-web-app/cube-cos-ui.spec ~/rpmbuild/SPECS
rpmlint ~/rpmbuild/SPECS/cube-cos-ui.spec
```

### Build

```bash
rpmbuild -bb --nodeps --define "version $VERSION" --define "build_number $BUILD_NUMBER" ~/rpmbuild/SPECS/cube-cos-ui.spec
```

### Upload

- upload the rpm under ~/rpmbuild/RPMS/x86_64

```bash
ls -ahl ~/rpmbuild/RPMS/x86_64/cube-cos-ui-$VERSION-1.el9.$BUILD_NUMBER.x86_64.rpm
```

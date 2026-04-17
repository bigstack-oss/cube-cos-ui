# Build & Deploy RPM

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
# node and pnpm install reference: https://nodejs.org/en/download

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24.15.0

# Verify the Node.js version:
node -v # Should print "v24.15.0".

# Download and install pnpm:
corepack enable pnpm

corepack prepare pnpm@latest-10

# Verify pnpm version:
pnpm -v
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
cp -r ./.git/ ~/source/
pushd ~/source
git checkout .
sudo rm -r ./.git/
popd
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

### Output

- built rpm would be under ~/rpmbuild/RPMS/x86_64

```bash
ls -ahl ~/rpmbuild/RPMS/x86_64/cube-cos-ui-$VERSION-1.el9.$BUILD_NUMBER.x86_64.rpm
```

## Deploy RPM

1. Send the built rpm to a running CubeCOS

```bash
scp "<path of rpm>" "<user>@<cubecos>:<path to place rpm>"
```

2. Install the rpm

```bash
dnf -y remove cube-cos-ui
dnf -y install "<path to cube-cos-ui rpm>"
```

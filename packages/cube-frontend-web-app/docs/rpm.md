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

2. Install the rpm and start the service

```bash
dnf install "<path to cube-cos-ui rpm>"
```

3. Clean up

```bash
dnf remove cube-cos-ui
```

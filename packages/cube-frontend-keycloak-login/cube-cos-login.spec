Name:           cube-cos-login
Version:        %{version}
Release:        1%{?dist}.%{build_number}
Summary:        Login for CubeCOS

License:        Apache License 2.0
URL:            https://github.com/bigstack-oss/cube-cos-ui
Source0:        https://github.com/bigstack-oss/cube-cos-ui/tree/%{build_number}

BuildRequires:  nodejs buildah podman

%description
The Login for CubeCOS.

%prep
rm -rf ./*
cp ../SOURCES/"cube-cos-login-%{version}.tar.gz" .
tar -xzf "cube-cos-login-%{version}.tar.gz"
rm "cube-cos-login-%{version}.tar.gz"
mv ./source/* .
rmdir source

%build
npm list -g pnpm
pnpm install
cd ./packages/cube-frontend-keycloak-login
pnpm run build
rm -rf ./keycloak/themes/cos-ui/login/resources
cp -r ./dist/resources ./keycloak/themes/cos-ui/login
ctr=$(buildah from quay.io/keycloak/keycloak:%{keycloak_version})
buildah copy $ctr ./keycloak/themes/ /opt/jboss/keycloak/themes/
buildah commit $ctr localhost:5080/bigstack/keycloak:%{keycloak_version}
buildah rm $ctr
cd -
podman save localhost:5080/bigstack/keycloak:%{keycloak_version} -o keycloak-image.tar

%install
rm -rf $RPM_BUILD_ROOT
mkdir -p $RPM_BUILD_ROOT/%{_datadir}/cube/login
cp keycloak-image.tar $RPM_BUILD_ROOT/%{_datadir}/cube/login

%files
%{_datadir}/cube/login

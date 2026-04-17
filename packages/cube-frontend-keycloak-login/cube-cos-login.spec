Name:           cube-cos-login
Version:        %{version}
Release:        1%{?dist}.%{build_number}
Summary:        Login for CubeCOS

License:        Apache License 2.0
URL:            https://github.com/bigstack-oss/cube-cos-ui
Source0:        https://github.com/bigstack-oss/cube-cos-ui/tree/%{build_number}

BuildRequires:  buildah podman

%description
The Login for CubeCOS.

%prep
rm -rf ./*
cp %{_topdir}/SOURCES/"cube-cos-login-%{version}.tar.gz" .
tar -xzf "cube-cos-login-%{version}.tar.gz"
rm "cube-cos-login-%{version}.tar.gz"
find ./source/ -mindepth 1 -maxdepth 1 -name  '*' -exec mv -t . {} +
rmdir source

%build
pnpm install
cd ./packages/cube-frontend-keycloak-login
pnpm run build
rm -rf ./keycloak/themes/cos-ui/login/resources
cp -r ./dist/resources ./keycloak/themes/cos-ui/login
ctr=$(buildah from quay.io/keycloak/keycloak:%{keycloak_version})
buildah copy $ctr ./keycloak/themes/ /opt/jboss/keycloak/themes/
buildah commit $ctr localhost:5080/bigstack/keycloak:%{version}
buildah rm $ctr
cd -
podman save localhost:5080/bigstack/keycloak:%{version} -o keycloak-image.tar

%install
rm -rf $RPM_BUILD_ROOT
mkdir -p $RPM_BUILD_ROOT/%{_datadir}/cube/login
cp keycloak-image.tar $RPM_BUILD_ROOT/%{_datadir}/cube/login

%files
%{_datadir}/cube/login

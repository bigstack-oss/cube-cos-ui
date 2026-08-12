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
buildah copy $ctr ./keycloak/themes/ /opt/keycloak/themes/
# The WildFly deployment asked for three cache owners via CACHE_OWNERS_COUNT. Quarkus
# reads that from cache-ispn.xml instead, which ships with two.
buildah run $ctr -- sed -i 's/owners="2"/owners="3"/g' /opt/keycloak/conf/cache-ispn.xml
# Quarkus fixes these options when the server is augmented, so bake them in here. Left to
# the runtime environment they make every pod re-augment while starting, and
# http-relative-path cannot be changed at runtime at all.
buildah run $ctr -- /opt/keycloak/bin/kc.sh build \
    --db=mariadb \
    --cache=ispn \
    --health-enabled=true \
    --metrics-enabled=true \
    --http-relative-path=/auth
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

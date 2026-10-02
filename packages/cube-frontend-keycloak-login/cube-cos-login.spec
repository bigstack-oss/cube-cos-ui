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
# There is no cache owner rewrite any more. The WildFly deployment asked for three owners
# via CACHE_OWNERS_COUNT, and 18 and 22 read that from conf/cache-ispn.xml, so this spec
# used to sed it from two to three. 26 builds its caches in code: the cache-ispn.xml it
# still ships is a stub with no caches in it, so the sed matched nothing and still exited
# 0. The owner count is upstream's to set now -- one for the session caches, whose data is
# persisted to the database (persistent-user-sessions, on by default), and at least two for
# the in-memory login failure, authentication session and action token caches.
#
# Quarkus fixes these options when the server is augmented, so bake them in here. Left to
# the runtime environment they make every pod re-augment while starting, and
# http-relative-path cannot be changed at runtime at all. cache is no longer one of them:
# 26 made it a runtime option, which `kc.sh build` reports as ignored, and the keycloakx
# chart sets KC_CACHE in the pod environment instead.
#
# transaction-xa-enabled=false is what lets this image run against CubeCOS' database at
# all once the cluster is HA: keycloak 22 defaulted to XA transactions, and MariaDB refuses
# them whenever wsrep is on -- "This version of MariaDB doesn't yet support 'XA
# transactions with Galera replication'". That aborts the very first bootstrap midway,
# after the default client scopes are committed but before MIGRATION_MODEL is stamped,
# so every later start re-runs the initial migration and dies on a duplicate role_list
# scope. A single-node install has no [galera] section and never sees it. The option is
# build-time, so this build line is where it takes effect. 26 flipped the default to false
# (TransactionOptions.java), and that is why it stays spelled out: the image must not
# depend on a default upstream has already changed once.
buildah run $ctr -- /opt/keycloak/bin/kc.sh build \
    --db=mariadb \
    --health-enabled=true \
    --metrics-enabled=true \
    --http-relative-path=/auth \
    --transaction-xa-enabled=false
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

Name:           cube-cos-ui
Version:        %{version}
Release:        1%{?dist}.%{build_number}
Summary:        UI for CubeCOS

License:        Apache License 2.0
URL:            https://github.com/bigstack-oss/cube-cos-ui
Source0:        https://github.com/bigstack-oss/cube-cos-ui/tree/%{build_number}

BuildRequires:  nodejs

%description
The UI for CubeCOS.

%prep
rm -rf ./*
cp ../SOURCES/"cube-cos-ui-%{version}.tar.gz" .
tar -xzf "cube-cos-ui-%{version}.tar.gz"
rm "cube-cos-ui-%{version}.tar.gz"
mv ./source/* .
rmdir source

%build
npm list -g pnpm
pnpm install
cd ./packages/cube-frontend-web-app
pnpm run build

%install
rm -rf $RPM_BUILD_ROOT
mkdir -p $RPM_BUILD_ROOT/%{_datadir}/cube/ui
cp LICENSE $RPM_BUILD_ROOT/%{_datadir}/cube/ui
cp -r ./packages/cube-frontend-web-app/dist/. $RPM_BUILD_ROOT/%{_datadir}/cube/ui

%files
%{_datadir}/cube/ui

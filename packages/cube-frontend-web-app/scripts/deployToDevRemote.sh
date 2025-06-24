#!/bin/bash

set -euo pipefail

# Set TRACE=1 to enable debugging: `TRACE=1 $0`
[[ -n "${TRACE-}" ]] && set -x

SH_DIR=$(dirname "$(realpath "$0")")
ROOT_DIR=$(dirname "$SH_DIR")
LOCAL_DIST_DIR="${ROOT_DIR}/dist"
HOST_CONFIG_FILE="${SH_DIR}/remote_hosts.properties.local"

# shellcheck source=./remote_hosts.properties.local
source "${HOST_CONFIG_FILE}"

if [[ ! -d "$LOCAL_DIST_DIR" ]]; then
  echo "Error: Local distribution directory does not exist: $LOCAL_DIST_DIR"
  exit 1
fi

for remote_host in "${remote_hosts[@]}"; do
  backup_date=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  cos_ui_backup_path="${cos_ui_path}.${backup_date}.bak"

  ssh_host="${user}@${remote_host}"
  scp_cos_ui_path="${ssh_host}:${cos_ui_path}"
  scp_cos_ui_backup_path="${ssh_host}:${cos_ui_backup_path}"

  echo "[${ssh_host}] Backup: ${scp_cos_ui_path} -> ${scp_cos_ui_backup_path}"
  # shellcheck disable=SC2029
  ssh "$ssh_host" mv "${cos_ui_path}" "${cos_ui_backup_path}"

  echo "[${ssh_host}] Deploy: ${LOCAL_DIST_DIR} -> $scp_cos_ui_path"
  scp -r "$LOCAL_DIST_DIR" "$scp_cos_ui_path"
done

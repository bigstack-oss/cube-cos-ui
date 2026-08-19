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

# `dist` holds ~875 files, and all but five of them are font subsets. `scp -r`
# pays a few SFTP round trips per file, so on a link with any latency the deploy
# spends minutes on round trips rather than on the 24 MB itself. One tar stream
# over one ssh connection pays that cost once.
for remote_host in "${remote_hosts[@]}"; do
  backup_date=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  cos_ui_backup_path="${cos_ui_path}.${backup_date}.bak"
  cos_ui_staging_path="${cos_ui_path}.${backup_date}.new"

  ssh_host="${user}@${remote_host}"

  echo "[${ssh_host}] Deploy: ${LOCAL_DIST_DIR} -> ${ssh_host}:${cos_ui_path}"
  echo "[${ssh_host}] Backup: ${cos_ui_path} -> ${cos_ui_backup_path}"

  # The staging directory is unpacked before anything moves, so the live site
  # stays up for the whole transfer and a failed transfer leaves it untouched.
  # Only the two `mv` calls at the end are visible to a user.
  # shellcheck disable=SC2029
  tar -czf - -C "$LOCAL_DIST_DIR" . |
    ssh "$ssh_host" "set -eu
      trap \"rm -rf '${cos_ui_staging_path}'\" EXIT
      rm -rf '${cos_ui_staging_path}'
      mkdir -p '${cos_ui_staging_path}'
      tar -xzf - --no-same-owner -C '${cos_ui_staging_path}'
      mv '${cos_ui_path}' '${cos_ui_backup_path}'
      mv '${cos_ui_staging_path}' '${cos_ui_path}'"
done

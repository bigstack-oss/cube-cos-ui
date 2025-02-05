#!/bin/bash

set -euo pipefail
[[ -n "${TRACE-}" ]] && set -x

SH_DIR=$(dirname "$(realpath "$0")")
ROOT_DIR=$(dirname "$SH_DIR")
API_SDK_CONFIG_PATH="${ROOT_DIR}/api-sdk-config.json"

usage() {
  cat << EOF >&2
Usage: $0 {generate|validate}

Set TRACE=1 to enable debugging: TRACE=1 $0 {generate|validate}
EOF
}

# Using the jq Docker image to avoid requiring frontend developers to install jq on the host machine.
jq() {
  local jq_image='ghcr.io/jqlang/jq'
  local jq_version='1.7.1'
  docker run --rm -i "${jq_image}:${jq_version}" "$@"
}

load_api_sdk_config() {
  OPEN_API_GENERATOR_IMAGE=$(jq -r '.openApiGeneratorImage' < "$API_SDK_CONFIG_PATH")
  OPEN_API_GENERATOR_VERSION=$(jq -r '.openApiGeneratorVersion' < "$API_SDK_CONFIG_PATH")
  OPEN_API_PATH=$(jq -r '.openapiPath' < "$API_SDK_CONFIG_PATH")
  SDK_DIR=$(jq -r '.sdkDir' < "$API_SDK_CONFIG_PATH")
}

setup_docker_path() {
  DOCKER_WORKDIR="/app"
  DOCKER_OPEN_API_PATH="${DOCKER_WORKDIR}/${OPEN_API_PATH}"
  DOCKER_SDK_DIR="${DOCKER_WORKDIR}/${SDK_DIR}"
}

generate_api_sdk() {
  # Using the openapi-generator-cli Docker image,
  # since we don't want to install JVM on the host machine.
  # Reference: https://github.com/OpenAPITools/openapi-generator?tab=readme-ov-file#17---npm
  docker run \
    --rm \
    -w "$DOCKER_WORKDIR" \
    -v "${ROOT_DIR}:${DOCKER_WORKDIR}" \
    "${OPEN_API_GENERATOR_IMAGE}:${OPEN_API_GENERATOR_VERSION}" \
    generate \
    --skip-validate-spec \
    -i "$DOCKER_OPEN_API_PATH" \
    -g typescript-axios \
    -o "$DOCKER_SDK_DIR"
}

validate_open_api() {
  # Using the openapi-generator-cli Docker image,
  # since we don't want to install JVM on the host machine.
  # Reference: https://github.com/OpenAPITools/openapi-generator?tab=readme-ov-file#17---npm
  docker run \
    --rm \
    -w "$DOCKER_WORKDIR" \
    -v "${ROOT_DIR}:${DOCKER_WORKDIR}" \
    "${OPEN_API_GENERATOR_IMAGE}:${OPEN_API_GENERATOR_VERSION}" \
    validate \
    -i "$DOCKER_OPEN_API_PATH"
}

main() {
  if (( $# == 0 )); then
    usage
    exit 1
  fi

  local command="$1"

  load_api_sdk_config
  setup_docker_path

  case "$command" in
    generate)
      generate_api_sdk
      ;;
    validate)
      validate_open_api
      ;;
    *)
      usage
      exit 1
      ;;
  esac
}

main "$@"
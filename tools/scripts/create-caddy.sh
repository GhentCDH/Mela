#!/bin/bash

# Get directory from first argument
ROOT_DIR="/app/dist/apps/frontend"
PORT="9000"

# Parse named arguments
for arg in "$@"
do
  case $arg in
    --dir=*)
      ROOT_DIR="${arg#*=}"
      shift
      ;;
    --port=*)
      PORT="${arg#*=}"
      shift
      ;;
    *)
      echo "Unknown option: $arg"
      exit 1
      ;;
  esac
done


# Optional: fallback to current directory if no argument given
if [ -z "PORT" ]; then
  PORT="."
fi

OUTPUT_FILE="$ROOT_DIR/Caddyfile"

echo ":${PORT} {
	root * ${ROOT_DIR}
	file_server

  # Rewrite all requests that aren't actual files to index.html
  @vue_not_found {
    not file
  }
  rewrite @vue_not_found /index.html
}" > "$OUTPUT_FILE"
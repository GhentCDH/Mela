#!/bin/bash

# Get directory from first argument
ROOT_DIR="$1"

# Optional: fallback to current directory if no argument given
if [ -z "ROOT_DIR" ]; then
  ROOT_DIR="."
fi

# Full path to .env file
ENV_FILE="$ENV_DIR/.env"
# Only load .env file if 'env' is not already set
if [ -z "$KEYCLOAK_HOST" ]; then
  echo "'env' is not set. Loading from .env file..."
  set -a
  source .env
  set +a
else
  echo "'env' is already set to: $KEYCLOAK_HOST"
fi

# Output file
OUTPUT_FILE="$ROOT_DIR/assets/env.js"

# Environment variable keys
ENV_VARS=(
  "KEYCLOAK_HOST"
  "KEYCLOAK_REALM"
  "KEYCLOAK_CLIENT_ID"
  "ENV"
  "VERSION"
)

# Start writing to the env.js file
echo "window._env_ = {" > "$OUTPUT_FILE"

# Loop through each environment variable
for VAR_NAME in "${ENV_VARS[@]}"; do
  VAR_VALUE=$(printenv $VAR_NAME)
  echo "  $VAR_NAME: \"${VAR_VALUE}\"," >> "$OUTPUT_FILE"
done

# Close the object
echo "};" >> "$OUTPUT_FILE"

echo "env.js file has been created with the following variables: ${ENV_VARS[*]}"
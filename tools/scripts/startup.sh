#!/bin/bash

// run ./create-env.sh
# Get directory from first argument
ROOT_DIR="$1"

# Optional: fallback to current directory if no argument given
if [ -z "ROOT_DIR" ]; then
  ROOT_DIR="/app/dist/apps/frontend"
fi

./create-env.sh $ROOT_DIR
npx http-server -p 9000 $ROOT_DIR --host
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

./create-env.sh $ROOT_DIR
./create-caddy.sh --port=$PORT --dir=$ROOT_DIR
#npx http-server -p 9000 $ROOT_DIR --host


# Keep it running
caddy run --config $ROOT_DIR/Caddyfile --adapter caddyfile

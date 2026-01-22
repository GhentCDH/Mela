#!/bin/sh
set -e

# Always ensure dependencies are up to date
pnpm install

npx prisma generate

# Execute the main command
exec "$@"

#!/bin/sh
set -e

# Always ensure dependencies are up to date
pnpm install

pnpm run generate:prisma

# Execute the main command
exec "$@"

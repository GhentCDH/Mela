#!/bin/sh
set -e

# Always ensure dependencies are up to date
pnpm install

 npx nx run generated-types:build
 npx nx run generated-prisma:build
 npx nx run generated-dto:build

# Execute the main command
exec "$@"

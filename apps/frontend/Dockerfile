# Multi-stage build: Build Vue app, then serve with Caddy

FROM node:23-alpine AS build

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

RUN pnpm run generate:prisma

# Build the Vue app (creates /app/dist)
RUN NX_DAEMON=false pnpm exec nx build frontend --prod

RUN ls -all

# Production stage with Caddy web server
FROM caddy:2-alpine

# Copy Caddy configuration
COPY --from=build /app/apps/frontend/Caddyfile /etc/caddy/Caddyfile

# Copy built assets from build stage
COPY --from=build /app/dist/apps/frontend /srv

# Expose port 9000
EXPOSE 9000

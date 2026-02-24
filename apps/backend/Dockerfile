FROM node:24-alpine AS builder


WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY . .

# Install dependencies using mounted secret for npm auth
# Usage: docker build --secret id=npmrc,src=.npmrc -f apps/backend/Dockerfile.dev .
RUN --mount=type=secret,id=npmrc,target=/app/.npmrc \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Is needed for Prisma to work properly, it does not affect any database connections
ENV DATABASE_APP_URL=postgresql://demo:demo@postgres:5432/demo

# Build TypeScript
RUN DATABASE_APP_URL=postgresql://demo:demo@postgres:5432/demo NX_DAEMON=false pnpm exec nx build backend --prod --verbose


# Extract version from package.json
RUN node -p "require('./package.json').version" > /tmp/version.txt

# Deploy backend with production dependencies only (no registry access needed)
RUN echo "inject-workspace-packages=true" > /app/.npmrc && \
    pnpm deploy --filter @new-polities/backend --prod /deploy

# Production stage
FROM node:24-alpine AS runner
WORKDIR /app

# Build arguments for version and git sha
ARG VERSION
ARG BUILD_SHA

ENV NODE_ENV=production

# Copy production node_modules from pnpm deploy
COPY --from=builder /deploy/node_modules ./node_modules
COPY --from=builder /tmp/version.txt /tmp/version.txt

# Copy prisma files (needed for Prisma client)
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

# Copy built application
COPY --from=builder /app/dist/apps/backend ./dist

# Set version and build sha as environment variables
# Use build arg if provided, otherwise use version from package.json
RUN if [ -n "$VERSION" ]; then \
      echo "$VERSION" > /tmp/final_version.txt; \
    else \
      cat /tmp/version.txt > /tmp/final_version.txt; \
    fi

ENV APP_VERSION=${VERSION:-}
ENV BUILD_SHA=${BUILD_SHA:-}
ENV SERVICE=backend

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Switch to non-root user
USER nestjs

# Expose port
ENV PORT=${PORT:-3000}
EXPOSE $PORT

# Start the application
CMD ["node", "dist/main.js"]

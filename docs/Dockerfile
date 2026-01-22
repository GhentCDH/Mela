# Docs development
FROM node:23-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

ENV CI=true


# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (including dev dependencies)
RUN pnpm install

WORKDIR /app

#CMD SLEEP INFINITY
CMD  pnpm run docs:dev --port 2000

ARG NODE_VERSION=23

FROM node:${NODE_VERSION}-slim AS node-dev

# INSTALL dependencies
RUN apt-get update -qq && \
    apt-get install -qq -y \
        openssh-client && \
    apt-get clean && \
    apt-get autoclean

# Add pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN useradd -ms /bin/sh -u 1001 app
USER app

# Install dependencies
WORKDIR /app

COPY package*.json ./
COPY pnpm* ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source files into application directory
COPY --chown=app:app . /app

WORKDIR /app

# Frontend development
FROM node-dev AS build-fe

WORKDIR /app

#CMD SLEEP INFINITY
RUN pnpm run generate:prisma  && \
    npx nx run frontend:build:production

CMD npx http-server -p 80 dist/apps/frontend
#CMD vite serve --port 80
    #npx nx run frontend:serve:production --port 80

# Backend developmen
FROM node-dev AS mela-backend

WORKDIR /app

RUN pnpm run generate:prisma && \
    npx nx run backend:build:production

CMD PORT=80 node dist/apps/backend/main.js

  # ====== RUN CADDY =======
FROM caddy:2.8.4-alpine AS mela-frontend

COPY --from=build-fe /app/dist/apps/frontend /usr/share/caddy
COPY --from=build-fe /app/docker/prod/Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443
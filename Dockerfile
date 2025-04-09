ARG NODE_VERSION=23

FROM node:${NODE_VERSION}-slim AS node-dev

ARG version=no-version
ENV VERSION=${version}

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
FROM node-dev AS mela-frontend-build

WORKDIR /app

#CMD SLEEP INFINITY
RUN pnpm run generate:prisma  && \
    npx nx run frontend:build:production

# production stage
FROM caddy:2.8.4-alpine as mela-frontend
WORKDIR /app

COPY --from=mela-frontend-build /app /app

RUN apk add --no-cache bash


CMD  cd /app/tools/scripts && ./startup.sh --dir=/app/dist/apps/frontend --port=9000

EXPOSE 80 443 9000

# Backend developmen
FROM node-dev AS mela-backend

WORKDIR /app

RUN pnpm run generate:prisma && \
    npx nx run backend:build:production

CMD node dist/apps/backend/main.js

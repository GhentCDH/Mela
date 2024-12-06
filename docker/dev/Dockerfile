ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim AS node-dev

WORKDIR /app

# Set NX_DAEMON environment variable to false to prevent nx from running in daemon mode
#ENV NX_DAEMON=false

COPY package*.json ./
COPY pnpm*.json ./

RUN corepack enable

ENV NX_DAEMON_SOCKET_DIR=/tmp/nx-daemon
ENV NX_DEAMON=true

RUN corepack prepare pnpm --activate

RUN pnpm install

CMD npx vite serve


FROM node-dev AS node-fe

WORKDIR /app/apps/frontend

CMD npx vite serve

FROM node-dev AS node-be

WORKDIR /app/apps/backend

CMD npx vite serve

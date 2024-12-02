ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim as node-dev

WORKDIR "/app"

COPY package*.json ./
COPY pnpm*.json ./


RUN corepack enable
RUN corepack prepare pnpm --activate

RUN pnpm install

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim AS node-dev

# INSTALL dependencies
RUN apt-get update -qq && \
    apt-get install -qq -y \
        openssh-client && \
#        curl \
#        apt-transport-https \
#        gnupg \
#        openssh-client \
#        software-properties-common \
#        git && \
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
COPY pnpm*.json ./

RUN corepack enable
RUN corepack prepare pnpm --activate
RUN pnpm install


# Copy source files into application directory
COPY --chown=app:app . /app

WORKDIR /app
CMD npx prisma migrate dev
CMD pnpm run generate:prisma

# Frontend development
FROM node-dev AS node-fe-dev

WORKDIR /app

#CMD SLEEP INFINITY
CMD npx nx run frontend:serve

# Backend development
FROM node-dev AS node-be-dev

WORKDIR /app


#CMD SLEEP INFINITY
CMD npx nx run backend:serve

  # ====== RUN CADDY =======
FROM caddy:2.8.4-alpine AS frontend

EXPOSE 80 443

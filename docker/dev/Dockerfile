ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-slim AS node-dev

ENV VERSION=local-development

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

COPY Mela/package*.json ./
COPY Mela/pnpm* ./

# Copy ghentcdh linked packages
COPY ghentcdh/ /ghentcdh/

#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Copy source files into application directory
COPY --chown=app:app Mela/ /app

WORKDIR /app

#RUN npx prisma generate
#RUN npx prisma migrate dev
#RUN npx prisma migrate status
#RUN pnpm run generate:zod

# Docs development
FROM node-dev AS node-docs

WORKDIR /app

#CMD SLEEP INFINITY
CMD  pnpm run docs:dev --port 2000


# Frontend development
FROM node-dev AS node-fe-dev

WORKDIR /app

RUN ./tools/scripts/create-env.sh /app/apps/frontend/

#CMD SLEEP INFINITY
CMD  npx nx run frontend:serve

# Backend development
FROM node-dev AS node-be-dev

WORKDIR /app


#CMD SLEEP INFINITY
CMD npx prisma migrate deploy && npx nx run backend:serve

  # ====== RUN CADDY =======
FROM caddy:2.8.4-alpine AS frontend

EXPOSE 80 443


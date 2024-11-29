########
# Base #
########
FROM node:22-bookworm-slim as node-base

FROM node-base as pnpm-base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

##############ena
# Target dev #
##############
FROM pnpm-base as dev

#Global install npm needs sudo
#RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install development tools for debugging and profiling
RUN apt-get update && apt-get install -y micro ncdu htop fzf ripgrep git telnet iputils-ping

WORKDIR /app
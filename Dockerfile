FROM node:21-slim AS base
RUN corepack enable

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Update alles und install wichtige sachen
RUN apt-get update -y && apt-get install -y openssl

# Copy das hier in Dockerfile
COPY . /home/app/
WORKDIR /home/app/

# Setup Workspace
RUN pnpm install

# Format Check
RUN pnpm run format:check

# Prebuild setup
RUN pnpm run build

ENV GITHUB_ACCESS_TOKEN=""
ENV DISCORD_WEBHOOK_URL=""
ENV HOTJAR_ID=""

EXPOSE 44077
CMD [ "pnpm", "start" ]
# Set-up build image
FROM node:21-alpine AS builder
ENV NODE_ENV=production

WORKDIR /app

# Copy package.json, lockfile and .npmrc
COPY ["pnpm-lock.yaml", "package.json", ".npmrc", "./"]

# Install build tools
RUN apk add --no-cache alpine-sdk python3 && \
    npm install -g pnpm && \
    pnpm install

# Copy all files to working directory
COPY . .

# Compile Typescript and remove dev packages
RUN pnpm build && \
    pnpm prune --prod

# Set-up running image
FROM node:21-alpine
ARG commit_hash
ENV NODE_ENV=production \
    COMMIT_HASH=$commit_hash
WORKDIR /app

# Copy all files (including source :/)
COPY --from=builder /app .

# Run
CMD ["npm", "start"]
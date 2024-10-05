# Base image
# Base image
FROM node:20-alpine AS builder

# Working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm package manager
RUN npm install -g pnpm@8.10.2

# Install dependencies
RUN pnpm install

# Working directory
WORKDIR /app

# Copy app files
COPY . .

# Build the app
RUN pnpm run server:build

# Production image
FROM node:20-alpine AS production

# Copy build files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/src ./

# Start server
CMD ["npm", "run", "prod"]

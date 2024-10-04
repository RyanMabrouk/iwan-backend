# Base image
FROM softyeducation-base-image AS builder

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
CMD ["npm", "run", "start:prod"]

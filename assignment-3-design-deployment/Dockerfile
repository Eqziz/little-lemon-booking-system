# Multi-stage production Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dependencies
RUN npm ci --only=production

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 3002
USER node
CMD ["node", "src/app.js"]

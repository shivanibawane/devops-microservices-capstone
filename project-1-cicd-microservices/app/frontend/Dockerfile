FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

FROM node:18-alpine
WORKDIR /app
# Run as non-root user for security best practices
USER node
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node server.js test.js package.json ./

EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "server.js"]

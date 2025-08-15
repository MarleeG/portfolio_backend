# --- Runtime image ---
FROM node:20-alpine
WORKDIR /app

# Install deps (lockfile-aware)
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# Copy app source
COPY . .

# Env + networking
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Helpful stack traces in prod
ENV NODE_OPTIONS="--enable-source-maps --trace-uncaught --unhandled-rejections=strict"

# Start the server
CMD ["node", "server.js"]
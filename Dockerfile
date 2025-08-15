FROM node:20-alpine
WORKDIR /app

# install deps (works with or without lockfile)
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

COPY . .
ENV NODE_ENV=production
ENV PORT=8080
ENV NODE_OPTIONS="--enable-source-maps --trace-uncaught --unhandled-rejections=strict"

EXPOSE 8080
CMD ["node", "server.js"]
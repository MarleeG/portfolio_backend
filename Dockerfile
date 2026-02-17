FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=8080
ENV NODE_OPTIONS="--enable-source-maps --trace-uncaught --unhandled-rejections=strict"

EXPOSE 8080
CMD ["node", "dist/main.js"]

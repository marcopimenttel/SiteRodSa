# Frontend + API (formulário, admin, visitas) para Coolify
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80
ENV DATA_DIR=/app/data

COPY package.json package-lock.json ./
# Runtime só precisa do Node stdlib + dist/server; sem deps nativas
COPY --from=build /app/dist ./dist
COPY server ./server

RUN mkdir -p /app/data

EXPOSE 80
VOLUME ["/app/data"]

CMD ["node", "server/index.mjs"]

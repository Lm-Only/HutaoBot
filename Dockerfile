FROM node:22-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ffmpeg \
    git \
    ca-certificates \
    bash \
    tini \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .
RUN mkdir -p /app/assets/qr-code /app/assets/users \
  && chown -R node:node /app

USER node
ENV NODE_ENV=production
ENV TZ=America/Sao_Paulo

ENTRYPOINT ["tini", "--"]
CMD ["npm", "start"]

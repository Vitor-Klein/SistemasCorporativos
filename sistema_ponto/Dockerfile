# Production build on Node 20
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Compila o TypeScript manualmente
RUN npx tsc -p tsconfig.build.json

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm","run","start:prod"]

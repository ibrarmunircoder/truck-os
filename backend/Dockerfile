FROM node:16-alpine3.14 AS base-stage
WORKDIR /app
COPY tsconfig.base.json .eslintrc.json ./
WORKDIR /app/backend
COPY backend/package*.json ./

FROM node:16-alpine3.14 AS development
WORKDIR /app/backend
RUN apk add py3-pip make g++ curl
COPY --from=base-stage /app /app
RUN npm install
COPY backend .
RUN npm run createSchema && npm run generateDocs
CMD [ "sh", "-c", "npm run migration:local:config && npm run migration:local:run && { npm run import:initial || echo -e \"\n\nSEEDING FAILED!\n\" ; } && npm run start:dev" ]

FROM base-stage AS compile-stage
RUN npm ci
COPY backend .
RUN npm run createSchema && \
  npm run generateDocs && \
  npm run-script build && \
  npm prune --production --ignore-scripts

FROM node:16-alpine3.14 AS runtime-image
# Note ; we tunnel to postgres via a backend task
# And we use curl for internal healthchecks
RUN apk add --no-cache --update curl postgresql
WORKDIR /app
COPY /backend/data ./dist/data
COPY --from=compile-stage /app/backend/dist ./dist
COPY --from=compile-stage /app/backend/node_modules ./node_modules
RUN ln -s /etc/secrets/.env .env
CMD [ "node", "dist/src/main.js" ]

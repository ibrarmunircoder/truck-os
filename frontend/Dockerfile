FROM node:16-alpine3.14 AS base-stage
WORKDIR /app/frontend
RUN apk add --no-cache --update git openssh
ENV NEXT_TELEMETRY_DISABLED=1
COPY tsconfig.base.json .eslintrc.json ../
COPY frontend/package*.json ./
COPY frontend/patches ./patches

FROM node:16-alpine3.14 as development
WORKDIR /app/frontend
RUN apk add --no-cache --update git openssh && apk add bash curl
COPY --from=base-stage /app /app
RUN npm ci
COPY frontend .
ARG API_KEY
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_PLATFORM_URL
ARG NEXTAUTH_URL
ARG TENANT_ID
ARG NODE_OPTIONS
ENV NEXT_TELEMETRY_DISABLED=1
RUN env
CMD [ "npm", "run", "dev" ]

FROM base-stage as compile-stage
RUN npm ci
COPY frontend .
ARG API_KEY
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_PLATFORM_URL
ARG NEXTAUTH_URL
ARG TENANT_ID
ARG NODE_OPTIONS
RUN env && npm run-script build && \
  npm prune --production --ignore-scripts

FROM node:16-alpine3.14 AS runtime-image
WORKDIR /app/frontend
RUN apk add --no-cache --update curl
ARG BRANCH_NAME
ARG COMMIT_SHA
ARG NODE_OPTIONS
COPY --from=compile-stage /app/frontend/public ./public
COPY --from=compile-stage /app/frontend/routes ./routes
COPY --from=compile-stage /app/frontend/.next ./.next
COPY --from=compile-stage /app/frontend/node_modules ./node_modules
COPY --from=compile-stage /app/frontend/package.json ./package.json
COPY --from=compile-stage /app/frontend/next-i18next.config.js ./next-i18next.config.js
COPY --from=compile-stage /app/frontend/next.config.js ./next.config.js
RUN env && echo "{\"commit\": \"${COMMIT_SHA}\", \"branch\": \"${BRANCH_NAME}\", \"timestamp\": \"$(date -Iseconds)\"}" > ./public/deployment.json
COPY frontend/package*.json ./

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3200

ENV PORT 3200

CMD [ "./node_modules/.bin/next", "start" ]

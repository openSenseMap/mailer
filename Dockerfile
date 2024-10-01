# Based on best pratices provided by Snyk.io
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

# base node image
FROM node:22-bullseye-slim as base

# set for base and all layer that inherit from it
# ENV NODE_ENV production

# Install all noe_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package.json package-lock.json ./
RUN npm install

# Build the app
FROM base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD . .
RUN npm run build

# Setup production node_modules
FROM base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json package-lock.json ./
RUN npm install --production

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /myapp

COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/emails /myapp/emails

COPY --from=build /myapp/dist /myapp/dist
ADD . .

CMD ["node", "dist/index.js"]
FROM node:lts as dependencies
WORKDIR /franchise-sys-frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /franchise-sys-frontend
COPY . .
COPY --from=dependencies /franchise-sys-frontend/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /franchise-sys-frontend
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /franchise-sys-frontend/next.config.js ./
COPY --from=builder /franchise-sys-frontend/public ./public
COPY --from=builder /franchise-sys-frontend/.next ./.next
COPY --from=builder /franchise-sys-frontend/node_modules ./node_modules
COPY --from=builder /franchise-sys-frontend/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
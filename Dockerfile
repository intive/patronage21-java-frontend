FROM node:16-alpine3.13 AS builder
ENV REACT_APP_USER_MODULE_URL=/frontend-api
WORKDIR '/app'
COPY package*.json .
COPY .babelrc .
COPY scripts ./scripts
COPY public ./public
COPY src ./src
RUN npm install \
    && npm run-script generate-error-pages \
    && npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
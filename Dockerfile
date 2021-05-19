FROM node:16-alpine3.13 AS builder
WORKDIR '/app'
COPY package.json .
ENV REACT_APP_USER_MODULE_URL=/frontend-api
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80

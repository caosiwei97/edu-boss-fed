# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm i --registry=https://registry.npm.taobao.org && npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
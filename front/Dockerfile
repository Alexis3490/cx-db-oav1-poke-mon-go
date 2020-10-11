# build environment
FROM node:alpine as build
WORKDIR /app
COPY . /app
RUN rm -rf nginx_conf
RUN yarn install
RUN yarn build

# production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx_conf/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
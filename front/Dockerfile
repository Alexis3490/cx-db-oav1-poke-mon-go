# build environment
FROM node:latest as build
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn add trunx
RUN yarn run build

# production environment
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM node:16.15.1 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/src/app/dist/ .
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
FROM node:16.15.1 AS build
WORKDIR /lit-clothing
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.1
COPY --from=build /lit-clothing/build /usr/share/nginx/html
EXPOSE 8080
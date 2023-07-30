FROM node:20-alpine3.18 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_BACKEND_URL=https://api.learnease.tech/api/
RUN npm run build

FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/src/app/dist/ .
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
################################
#Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

################################
#Serve
FROM nginx:stable-alpine

COPY --from=build /app/dist/channel-archive-frontend/browser /usr/share/nginx/html

RUN sed -i "s|default_value|${SERVER_URL}|g" /usr/share/nginx/html/assets/config.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

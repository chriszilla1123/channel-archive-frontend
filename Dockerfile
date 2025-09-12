################################
#Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

################################
#Serve
FROM nginx:stable-alpine

# Copy built Angular app
COPY --from=build /app/dist/channel-archive-frontend/browser /usr/share/nginx/html

# Copy custom entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN mkdir -p /usr/share/nginx/html/assets && touch /usr/share/nginx/html/assets/env.js

EXPOSE 80

CMD ["/entrypoint.sh"]

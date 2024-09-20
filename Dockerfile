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

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

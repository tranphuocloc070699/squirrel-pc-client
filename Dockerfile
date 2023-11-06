FROM node:lts-alpine as build-stage
WORKDIR /app



COPY package*.json ./
# RUN npm install --production
RUN npm install 
COPY . .
ENV VITE_BASE_URL_BACKEND=http://squirrel-sp-server:8080

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
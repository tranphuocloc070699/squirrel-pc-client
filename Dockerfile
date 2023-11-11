FROM node:lts-alpine as build-stage
WORKDIR /app



COPY package*.json ./
# RUN npm install --production
RUN npm install 
COPY . .
ENV VITE_BASE_URL_BACKEND=http://3.98.128.174:8080

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


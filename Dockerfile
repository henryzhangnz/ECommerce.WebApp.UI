FROM node:22 AS build
WORKDIR /app
COPY package.json ./
RUN npm install --save
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/webapp /usr/share/nginx/html
COPY --from=build /app/dist/webapp/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
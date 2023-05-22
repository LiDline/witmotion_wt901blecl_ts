FROM node:18.16.0-alpine as builder
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent 
# RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm run build


FROM nginx:1-alpine3.17  
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/public/ /usr/share/nginx/html

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
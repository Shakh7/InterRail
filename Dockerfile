FROM node:14.0.0 as builder

RUN apt update && apt-get install -y yarn

RUN mkdir app

WORKDIR app
COPY . ./

RUN yarn install
RUN yarn build 


FROM nginx:stable-alpine as production-stage

COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
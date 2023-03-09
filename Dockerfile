FROM node:14.0.0 as builder

RUN apt update && apt-get install -y yarn

RUN mkdir app

WORKDIR app

COPY . ./

RUN yarn install
RUN yarn build 

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
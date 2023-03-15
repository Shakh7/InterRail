FROM node:14.0.0 as builder

RUN apt update && apt-get install -y yarn

RUN mkdir app

WORKDIR app

COPY . ./

RUN yarn install
RUN yarn build 

# production environment
FROM nginx:1.23
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
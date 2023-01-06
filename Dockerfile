FROM node:16.0.0 as builder

RUN apt update && apt-get install -y yarn

RUN mkdir app

WORKDIR app

COPY . ./
# TODO: create .env config in server
ENV VUE_APP_URL=https://interrailvue-oruhn.ondigitalocean.app/

ENV VUE_APP_ORDER_URL=https://order.interrail.uz
ENV VUE_APP_USERS_URL=https://user.interrail.uz/api/v1
ENV VUE_APP_I18N_LOCALE=en
ENV VUE_APP_I18N_FALLBACK_LOCALE=en

RUN yarn install
RUN yarn build 

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
FROM node:10.15.0-alpine
EXPOSE 3000

# ARG API_HOST
# ENV API_HOST $API_HOST

WORKDIR /home/app

COPY package.json /home/app/
RUN npm install

COPY . /home/app

# RUN npm start

CMD [ "npm", "start" ]

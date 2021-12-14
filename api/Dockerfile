FROM node:10.15.0-alpine
EXPOSE 4200 4000

WORKDIR /home/app

COPY package.json /home/app/
RUN npm install --production

COPY . /home/app

# RUN npm start

CMD [ "npm", "start" ]
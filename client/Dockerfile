FROM node:10.15.0-alpine
EXPOSE 3000

WORKDIR /home/app

COPY package.json /home/app/
RUN npm install --production

COPY . /home/app

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]

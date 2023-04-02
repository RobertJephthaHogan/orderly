FROM node:alpine

WORKDIR /client
COPY ./package.json /client
COPY ./ /client
RUN npm install
# CMD ["npm", "start"]

RUN npm run build
RUN npm install -g serve
CMD serve -s build

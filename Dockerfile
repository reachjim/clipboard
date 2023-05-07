FROM node: 8.9.4-alpine
RUN mkdir -p /usr/src/app
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
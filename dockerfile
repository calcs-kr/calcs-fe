FROM node:18.12.1
WORKDIR /app
COPY . .
RUN npm i
#CMD [ "npm", "start" ]
CMD [ "sleep", "infinity" ]

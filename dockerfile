FROM node:16.15
WORKDIR /app
COPY . .
RUN npm i --legacy-peer-deps
#RUN npm i
# CMD [ "npm", "start" ]
CMD [ "sleep", "infinity" ]
EXPOSE 3000


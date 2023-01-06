FROM node:16-alpine
WORKDIR /server

COPY . .

# build dist folder
RUN npm install
RUN npm run build


# start app
CMD ["npm", "start"]
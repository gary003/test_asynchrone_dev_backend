FROM node:22-alpine

WORKDIR /app

# Install Python, build dependencies, and SQLite
RUN apk add --no-cache python3 py3-pip python3-dev \
    && apk add --no-cache build-base \
    && apk add --no-cache sqlite sqlite-dev

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

EXPOSE 8080

RUN ["npm", "run", "build"]

CMD [ "npm", "run", "start"]

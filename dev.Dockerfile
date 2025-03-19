# Description: Dockerfile for the development environment of the client
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Make sure the dev script has the correct host setting
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
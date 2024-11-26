FROM node:20 AS prod
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/. .
RUN npm run build
EXPOSE 8080
CMD npm run seed:container && node dist/main.js
FROM node:18

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/. .
COPY frontend ./frontend


EXPOSE 8080

CMD ["node", "app.js"]

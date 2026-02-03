FROM node:18

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend code
COPY backend/. .

# Copy frontend explicitly
COPY frontend ./frontend

EXPOSE 8080

CMD ["node", "app.js"]

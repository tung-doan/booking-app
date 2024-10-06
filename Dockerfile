# Stage 1: Build the frontend
FROM node:20.12.2 AS frontend-builder

# Set the working directory
WORKDIR /app/client

# Copy the frontend package.json and package-lock.json
COPY client/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY client/ ./

# Build the frontend
RUN npm run build

# Stage 2: Build the backend
FROM node:20.12.2 AS backend-builder

# Set the working directory
WORKDIR /app/api

# Copy the backend package.json and package-lock.json
COPY api/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY api/ ./

# Stage 3: Final stage
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the backend code from the backend-builder stage
COPY --from=backend-builder /app/api /app/api

# Copy the frontend build from the frontend-builder stage
COPY --from=frontend-builder /app/client /app/api/public

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the ports for the backend and frontend
EXPOSE 4000
EXPOSE 5000

# Start the backend and frontend
CMD ["sh", "-c", "cd /app/api && npm start & serve -s /app/api/public -l 5000"]
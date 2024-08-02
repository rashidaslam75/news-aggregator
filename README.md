# Docker Deployment Process

Running a React.js project within a Docker container involves several steps, including creating a Dockerfile, setting up a Docker Compose file (optional but recommended for managing multi-container applications), and running the Docker container. Below is a step-by-step guide to help you through this process.


## Step 1: Create a Dockerfile

Create a file named Dockerfile in the root of your React project directory. This file will contain the instructions to build the Docker image for your React app.

```bash
FROM node:18-alpine AS builder

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm i

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

```
## Step 3: Build the Docker Image
Open a terminal, navigate to your project directory, and build the Docker image using the docker build command:

```bash
docker build -t news-aggregator .
```

## Step 4: Run the Docker Container
Once the Docker image is built, you can run it using the docker run command:

```bash
docker run -p 80:80 news-aggregator
```

This command maps port 80 of the container to port 80on your host machine. You can access your React app by navigating to http://localhost:80 in your web browser.


## Optional: Using Docker Compose

For more complex applications or easier management, you can use Docker Compose. Create a file named docker-compose.yml in the root of your project directory:

```bash
version: '3.8'

services:
  react-app:
    build: .
    ports:
      - "80:80

```

Run the following command to start your services defined in the docker-compose.yml file:


```bash
docker-compose up
```

This will build the Docker image and start the container as specified in the docker-compose.yml file. Again, your React app will be accessible at http://localhost:80.

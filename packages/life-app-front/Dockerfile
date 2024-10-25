# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json ./

# Enable corepack
RUN npm install -g corepack
RUN corepack enable

# Install dependencies
RUN yarn set version stable
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=${VITE_APP_API_URL}

# Build the React app
RUN yarn build

# Use a lightweight web server to serve the built app
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
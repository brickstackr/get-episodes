# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the app’s source code into the container
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the built app
FROM nginx:alpine

# Copy the build files from the previous stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start the Nginx server to serve the app
CMD ["nginx", "-g", "daemon off;"]

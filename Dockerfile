# Use an official Node.js runtime as a parent image

# Stage 1: Build the application
FROM node:14 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the build script
RUN npm run build

FROM nginx:alpine
# Copy the built app from the previous stage

COPY --from=builder /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
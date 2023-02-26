# Use an official Node.js runtime as a parent image
FROM nginx:stable
# Copy the built app from the previous stage
COPY /build /usr/share/nginx/html
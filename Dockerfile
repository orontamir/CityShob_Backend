FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Set environment variables if needed
ENV NODE_ENV production

# Start your Node.js application
CMD ["node", "server.js"]
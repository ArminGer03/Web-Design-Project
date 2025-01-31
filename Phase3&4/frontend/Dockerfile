# Use an official Node.js 16 LTS image
FROM node:16-alpine

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app source
COPY . .

# Expose port 3000 for the dev server
EXPOSE 3000

# Use npm start to run the development server
CMD ["npm", "start"]
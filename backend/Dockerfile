FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Rename .env.cpy to .env if it exists
RUN [ -f .env.cpy ] && cp .env.cpy .env || touch .env

# Build the application
RUN npm run build

# Expose port 5000
EXPOSE 5000

# Start the application in production mode
CMD ["npm", "run", "start:prod"]
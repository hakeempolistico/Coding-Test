FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files, including .env.cpy
COPY . .

# ✅ Rename .env.cpy to .env before building
RUN cp .env.cpy .env

# ✅ Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]

FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including styled-components
RUN npm install styled-components
RUN npm install

# Update browserslist database
RUN npx update-browserslist-db@latest

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
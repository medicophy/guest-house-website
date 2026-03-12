# Step 1: Use Node.js (Like a Python environment for JS)
FROM node:20-alpine

WORKDIR /app

# Step 2: Copy package files first (to cache dependencies)
COPY package.json package-lock.json ./
RUN npm install

# Step 3: Copy the frontend code
COPY . .

# Step 4: Build the Next.js app for production
RUN npm run build

# Step 5: Open port 5500
EXPOSE 5500

# Step 6: Start the Next.js server
CMD ["npm", "run", "start", "--", "-p", "5500"]
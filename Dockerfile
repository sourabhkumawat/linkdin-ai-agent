# Stage 1: Base image with Chromium
FROM mcr.microsoft.com/playwright:v1.43.1-focal

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN npm install -g pnpm && pnpm install

RUN npm exec playwright install --with-deps chromium firefox webkit

# Copy all source files
COPY . .

# Expose port if needed
EXPOSE 3000

# Run your app
CMD ["pnpm", "start"]

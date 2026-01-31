# Use an official Node.js image as a base
FROM node:22-alpine

# Install necessary dependencies
RUN apk add --no-cache \
    curl \
    zsh \
    git \
    vim \
    tree

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Set the working directory inside the container
WORKDIR /usr/src/theme

# Start script: install deps if needed, then run dev server
CMD ["sh", "-c", "npm install && npm run dev"]

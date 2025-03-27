FROM node:22

WORKDIR /tap/app

# Install Python, build dependencies, SQLite, and additional tools
RUN apt-get update && apt-get install -y \
    curl \
    git \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*
    
COPY package*.json ./

RUN npm install

# Copy app source code, excluding /tap/data/projects.db (if in .dockerignore)
COPY . .

EXPOSE 8080

# Run as root (explicit for clarity)
USER root

CMD ["npm", "run", "start"]

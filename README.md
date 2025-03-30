# Description

This repository is a backend REST API built with Node.js and TypeScript, focusing on managing projects and their members, including support for nested groups (up to 5 levels). It uses TypeORM with SQLite for persistence and provides a GET /projects/:id/members endpoint to retrieve a flattened list of members recursively. The project avoids the need for a .env file to simplify testing and deployment for GitHub users.

# Prerequisites:

- Having git installed

# Fetch Project

Clone the project in a terminal:

- `git clone https://github.com/gary003/test_asynchrone_dev_backend.git`

- `cd test_asynchrone_dev_backend.git`

# Installation & Quick Start

### Docker

Having installed:

- docker

Build the Image from Dockerfile, in a terminal:

- `docker build -t docker_app .`

Launch a container from image

- `docker run -it -p 8080:8080 -v data:/tap/app/data docker_app`

### Git

Prerequisites:

If you don't use docker, you'll need to have installed : curl,python3,python3-pip,python3-dev,build-essential,sqlite3,libsqlite3-dev

Install depedencies:

- `npm install`

- `npm run start`

Tests + Coverage
Launch global tests, at the root of the project:

- `npm run test`

This runs Mocha tests with Chai assertions and Supertest for integration testing. Coverage reports with c8.

# OpenAPI (Swagger)

Copy this URL into a browser (adapt the port if needed):

- localhost:8080

# Developer

Gary Johnson

- Email: gary.johnson.freelance@gmail.com
- GitHub: https://github.com/gary003

# License

[MIT]

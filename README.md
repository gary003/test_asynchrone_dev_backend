# Description

This repository is a backend REST API built with Node.js and TypeScript, focusing on managing projects and their members, including support for nested groups (up to 5 levels). It uses TypeORM with SQLite for persistence and provides a GET /projects/:id/members endpoint to retrieve a flattened list of members recursively. The project avoids the need for a .env file to simplify testing and deployment for GitHub users.

# Prerequisites

Having installed:

- GIT, NODE.JS, NPM

# Git Installation

Clone the project

- git clone https://github.com/gary003/test_asynchrone_dev_backend.git

Go into the project directory

- cd test_asynchrone_dev_backend

Install the dependencies

- npm install

# Start API

Launch the app & DB (SQLite)

- npm run start

# OpenAPI (Swagger)

Copy this URL into a browser (adapt the port if needed):

- localhost:8080

# Tests + Coverage

Launch global tests

- npm run test

This runs Mocha tests with Chai assertions and Supertest for integration testing. Coverage reports with c8.

# Developer

Gary Johnson

- Email: gary.johnson.freelance@gmail.com
- GitHub: https://github.com/gary003

# License

[MIT]

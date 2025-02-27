# Monorepo with NestJS and Next.js (Dockerized)

This repository contains a full-stack application with:
- **Backend:** NestJS (TypeScript)
- **Frontend:** Next.js (React)

## Prerequisites
- Docker & Docker Compose installed

## Setup & Run
1. Clone the repository:
   ```sh
   git clone https://github.com/hakeempolistico/Coding-Test.git
   cd Coding-Test
   ```
2. Go inside directory:
   ```sh
   cd Coding-Test
   ```

3. Start the services:
   ```sh
   docker-compose -f docker-compose.yml up --build
   ```

4. Access the applications:
   - Backend: [http://localhost:5000](http://localhost:5000)
   - Frontend: [http://localhost:3000](http://localhost:3000)

## Stopping Services
```sh
docker-compose down
```

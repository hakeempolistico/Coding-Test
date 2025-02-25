# Monorepo with NestJS and Next.js (Dockerized)

This repository contains a full-stack application with:
- **Backend:** NestJS (TypeScript)
- **Frontend:** Next.js (React)
- **Database:** PostgreSQL

## Prerequisites
- Docker & Docker Compose installed

## Setup & Run
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd my-monorepo
   ```

2. Start the services:
   ```sh
   docker-compose -f docker-compose.yml up --build
   ```

3. Access the applications:
   - Backend: [http://localhost:5000](http://localhost:5000)
   - Frontend: [http://localhost:3000](http://localhost:3000)

## Environment Variables
Create `.env` files inside `backend/` and `frontend/` folders.

Example for `backend/.env`:
```
PORT=5000
DATABASE_URL=postgres://user:password@db:5432/mydb
```

Example for `frontend/.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Stopping Services
```sh
docker-compose down
```

## Notes
- Modify `docker-compose.yml` as needed.
- Ensure your `.env` files are configured correctly.

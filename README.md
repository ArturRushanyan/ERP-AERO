# ERP-AERO Test

## Tech Stack

- Node.js + Express
- Prisma (Data Mapper)
- MySql

## Requirements

- Node.js 20+
- npm 10+

## Install & Run

Clone the repository

```env
git clone <repo-url>
cd project-folder
```

Install dependencies

```
npm install
```

Create `.env` file (copy from example) and edit values.

```
cp env.example .env
```

Apply Prisma migrations

```
npx prisma migrate dev
```

Run the server

```
npm run dev
```

## Authentication

The system uses **Access Token (10 min)** and **Refresh Token (1 h)**.

## Postman Collection

A ready-to-use Postman collection is available in the project root folder:

```env
ERP-AERO.postman_collection.json
```

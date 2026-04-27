# Hostel Management API

## Setup

1. Install dependencies:
   npm install
2. Copy `.env.example` to `.env` and configure `MONGODB_URI`.
3. Start API:
   npm run dev

## Endpoints

- GET `/health`
- GET `/api/residents?q=`
- GET `/api/residents/summary/insights`
- GET `/api/residents/:id`
- POST `/api/residents`
- PUT `/api/residents/:id`
- DELETE `/api/residents/:id`
- POST `/api/residents/:id/feedback`

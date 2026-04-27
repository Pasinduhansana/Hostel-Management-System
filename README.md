# Hostel Management Monorepo

This repository is now split into two applications:

- `frontend/` -> React Native (Expo) app
- `backend/` -> Node.js + Express + MongoDB API

## Recommended Architecture

- Keep all mobile UI, routing, reusable components, hooks, and client-side validation in `frontend/`.
- Keep database models, API routes, controllers, and server-side validation in `backend/`.
- Treat frontend and backend as independent deployable units.
- Use shared API contracts (DTO/types) where possible to reduce mismatch between app and API.

## Run Commands (from repo root)

- Install frontend deps: `cd frontend && npm install`
- Install backend deps: `cd backend && npm install`
- Start Expo app: `npm run android` or `npm run web`
- Start backend API: `npm run backend`

## Folder Notes

- Resident Management frontend routes are in `frontend/app/(tabs)/residents/`.
- Resident reusable components are in `frontend/components/resident/`.
- Resident API server code is in `backend/src/`.

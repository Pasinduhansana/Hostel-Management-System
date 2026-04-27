# Hostel Management - Resident Management

This project now includes a complete Resident Management module with a React Native frontend and a MongoDB-backed Node.js API.

## Features

- Full CRUD operations for residents
- Search residents by name, room, email, or phone
- Resident details page
- Rating and feedback support per resident
- Frontend and backend validation
- Responsive and minimal blue-themed UI with reusable components
- Insights panel (novelty point): total residents, active residents, average rating, top-rated residents

## Frontend Setup (Expo)

1. Install app dependencies:

   ```bash
   npm install
   ```

2. Start Expo:

   ```bash
   npm run android
   ```

   or

   ```bash
   npm run web
   ```

## Backend Setup (MongoDB + Express)

1. Go to backend folder:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create `.env` from `.env.example` and set `MONGODB_URI`.

4. Run API:

   ```bash
   npm run dev
   ```

You can also run backend from the root project:

```bash
npm run api
```

## API URL Configuration

The app reads API URL from `expo.extra.residentApiUrl` in `app.json`.

- Default set for Android emulator: `http://10.0.2.2:5000`
- For web/iOS/local device, update this value to your reachable backend host.

## Main Resident Screens

- Residents list: `app/(tabs)/residents/index.tsx`
- Add resident: `app/(tabs)/residents/new.tsx`
- Resident detail: `app/(tabs)/residents/[id].tsx`
- Edit resident: `app/(tabs)/residents/edit/[id].tsx`

## Reusable Components

Resident module shared components are in `components/resident/`.

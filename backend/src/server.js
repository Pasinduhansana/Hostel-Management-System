import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import connectDB from './config/db.js';
import residentRoutes from './routes/residentRoutes.js';

const app = express();
const PORT = Number(process.env.PORT || 5000);
const MAX_PORT_RETRIES = 10;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'hostel-management-api' });
});

app.use('/api/residents', residentRoutes);

function startServer(port, retriesLeft) {
  const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && retriesLeft > 0) {
      // eslint-disable-next-line no-console
      console.warn(`Port ${port} is in use. Retrying on port ${port + 1}...`);
      startServer(port + 1, retriesLeft - 1);
      return;
    }

    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });
}

connectDB()
  .then(() => {
    startServer(PORT, MAX_PORT_RETRIES);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect MongoDB:', error.message);
    process.exit(1);
  });

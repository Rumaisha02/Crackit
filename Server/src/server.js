import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.warn(
    '\n=================================================================\n' +
    '⚠️ [NOTICE] .env file was not found in Server directory!\n' +
    '   Please create your .env file by copying .env.example:\n' +
    '   Windows: copy .env.example .env\n' +
    '   Linux/macOS: cp .env.example .env\n' +
    '=================================================================\n'
  );
}
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Start Server & DB connection
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Server] Listening on port ${PORT} (http://localhost:${PORT})`);
    console.log(`[Health Endpoint] GET http://localhost:${PORT}/api/health`);
  });
};

startServer();

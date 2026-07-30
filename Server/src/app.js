import express from 'express';
import cors from 'cors';
import healthRouter from './routes/health.js';
import authRouter from './routes/authRoutes.js';
import internshipRouter from './routes/internshipRoutes.js';
import resourceRouter from './routes/resourceRoutes.js';
import prepItemRouter from './routes/prepItemRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/internships', internshipRouter);
app.use('/api/resources', resourceRouter);
app.use('/api/prep-items', prepItemRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

export default app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import { connectDB } from './config/db';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 8080

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());





app.use('/api', authRoutes);
app.use('/api/admin',adminRoutes)

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
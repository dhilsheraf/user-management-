import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';

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

app.get('/',(req,res)=>{
  res.send('api run success')
}
)

app.get('/env-test', (req, res) => {
  res.send(`JWT_SECRET is: ${process.env.JWT_SECRET}`);
});


app.use('/api', authRoutes);
app.use('/api/admin',adminRoutes)

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.log(err)); 

  app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
  })
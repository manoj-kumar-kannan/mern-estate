import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected !!'))
  .catch((err) => console.log(err));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server Started at: ${PORT} !!!`);
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

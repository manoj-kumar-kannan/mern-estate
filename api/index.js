import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected !!'))
  .catch((err) => console.log(err));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server Started at: ${PORT} !!!`);
});

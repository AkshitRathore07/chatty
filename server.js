import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config(
  {
    path:'./.env'
  }
)

 connectDB();


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(cors(
{
  origin: process.env.CORS_ORIGIN
}
));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())


// Test API
app.get('/', (req, res) => {
  res.send('Chatty Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

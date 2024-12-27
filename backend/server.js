import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from './routes/auth.routes.js';
import positioningRoutes from './routes/positioning.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import lectureRoutes from './routes/lecture.routes.js';

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json()); // untuk parse req.body (between req and res)
app.use(express.urlencoded({ extended: true })); //to parse data -> POSTMAN

app.use(cookieParser());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/positionings', positioningRoutes);
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
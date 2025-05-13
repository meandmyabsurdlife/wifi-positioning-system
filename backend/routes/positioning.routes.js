import express from "express";

import { predictRSS } from "../controllers/positioning.contollers.js"

const router = express.Router();

router.post("/predict", predictRSS); //protectRoute


router.get("/result/:id", (req, res) => {
    res.json({
        data: 'you GET result of positioning based on check endpoint and current lecture class'
    });
});

export default router;
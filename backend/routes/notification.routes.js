import express from "express";

const router = express.Router();

//router.get("/me", protectRoute, getMe);
router.get("/", (req, res) => {
    res.json({
        data: 'you GET all notifications endpoint'
    });
});

//router.get("/me", protectRoute, getMe);
router.delete("/", (req, res) => {
    res.json({
        data: 'you DELETE all notifications'
    });
});

export default router;
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        data: 'you GET all lecture schedule endpoint'
    });
});

router.post("/", (req, res) => {
    res.json({
        data: 'you create a lecture '
    });
});

router.post("/attend/:id", (req, res) => {
    res.json({
        data: 'you hit ATTENDANCE endpoint'
    });
});

export default router;
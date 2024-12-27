import Student from '../models/student.models.js';
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({error: "Unauthorized: No Token Provider"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({error: "Invalid Token"});
        }

        //id ada di token
        const student = await Student.findById(decoded.studentId).select("-password");
        if(!student) {
            return res.status(404).json({error: "Student not found"});
        }

        req.student = student;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
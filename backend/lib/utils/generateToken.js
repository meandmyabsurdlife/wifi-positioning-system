import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (studentId, res) => {
    const token = jwt.sign({studentId}, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, //ms
        httpOnly: true, // prevent XSS attack cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    })
}
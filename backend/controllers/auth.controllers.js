import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

import Student from "../models/student.models.js";

//role: student
export const login = async (req, res) => {
    try {
        const { nim, password } = req.body;
        const student = await Student.findOne({ nim });
        const isPasswordValid = await bcrypt.compare(password, student?.password || "");

        if(!student || !isPasswordValid) {
            return res.status(400).json({ error: "Invalid NIM or password" });
        }
        
        generateTokenAndSetCookie(student._id, res);

        res.status(201).json({ 
            _id: student._id,
            nim: student.nim,
            name: student.name,
            registered_lectures: student.registered_lectures,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//role: student
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Log out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//role: admin
//untuk mempermudah (tidak dipakai dalam implementasi)
export const signup = async (req, res) => {
    try {
        const { nim, name, password } = req.body;
        //cek format NIM
        const nimRegex = /^[0-9]{8}$/;
        if (!nimRegex) {
            return res.status(400).json({ error: "Invalid NIM format" });
        }

        //cek apakah NIM sudah ada
        const existingNIM = await Student.findOne({ nim });
        if(existingNIM) {
            return res.status(400).json({ error: "NIM is already taken" });
        }

        //cek panjang password
        if(password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newStudent = new Student({
            nim: nim,
            name: name,
            password: hashedPassword,
        });

        if(newStudent){
            generateTokenAndSetCookie(newStudent._id, res);
            await newStudent.save();

            res.status(201).json({ 
                _id: newStudent._id,
                nim: newStudent.nim,
                name: newStudent.name,
            });
        } else {
            res.status(400).json({ error: "Invalid Student Data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
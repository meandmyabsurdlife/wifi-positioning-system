import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        nim:{
            type: String,
            required: true,
            unique: true, //tambahin validasi
        },
        name:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
            minLength: 6,
        },
        registered_lectures: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecture",
                default: [],
            }
        ],
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
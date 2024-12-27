import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        time_start: {
            type: String,
            required: true,
        },
        time_end: {
            type: String,
            required: true,
        },
        class_name: {
            type: String,
            required: true,
        }
    }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
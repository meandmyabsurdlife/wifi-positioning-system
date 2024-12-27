import mongoose from "mongoose";

const rssSchema = new mongoose.Schema(
    {
        student:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },
        networks: [
            {
                mac:{
                    type: String,
                    required: true,
                },
                bssid:{
                    type: String,
                    required: true,
                },
                ssid:{
                    type: String,
                    required: true,
                },
                channel:{
                    type: Number,
                    required: true,
                },
                frequency:{
                    type: Number,
                    required: true,
                },
                signal_level:{
                    type: Number,
                    required: true,
                },
                quality:{
                    type: Number,
                    required: true,
                },
                security:{
                    type: String,
                    required: true,
                },
            }
        ],
    }, 
    {timestamps: true}
);

const RSS = mongoose.model("RSS", rssSchema);

export default RSS;
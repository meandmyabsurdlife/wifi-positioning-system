//db: predicted_positions
import mongoose from "mongoose";

const positionSchema = new mongoose.Schema(
    {
        rss_record:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "RSS",
            required: true
        },
        predicted_position: {
            type: String,
            required: true,
        }
    }, 
    {timestamps: true}
);

const RSS = mongoose.model("RSS", rssSchema);

export default RSS;
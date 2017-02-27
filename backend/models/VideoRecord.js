import mongoose from "mongoose";
const Schema = mongoose.Schema;
const VideoRecord = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    customizeable: {
        type: Boolean,
        default: false
    },
    tags:{type: [String], required: true},
    updatedBy: String
}, {
    timestamps: true
});


// export default mongoose.model("VideoRecord", VideoRecord);
export default VideoRecord;
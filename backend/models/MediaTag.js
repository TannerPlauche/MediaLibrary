import mongoose from "mongoose";
const Schema = mongoose.Schema;
const MediaTag = new Schema({
    title: {
        type: String,
        required: true,
    },
    updatedBy: String
}, {
    timestamps: true
});


// export default mongoose.model("MediaTag", MediaTag);
export default MediaTag;
import mongoose from "mongoose";
import ImageRecord from "./ImageRecord";
import VideoRecord from "./VideoRecord";
import MediaTag from "./MediaTag";
const Schema = mongoose.Schema;
const MediaRecord = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    images: {type: [ImageRecord], index: true},
    videos: {type: [VideoRecord], index: true},
    tags: {type: [MediaTag], index: true},
    // tags: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'MediaTag'
    // }],
    updatedBy: String
}, {
    timestamps: true
});


export default mongoose.model("MediaRecord", MediaRecord);
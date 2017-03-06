import mongoose from "mongoose";
import ImageRecord from "./ImageRecord";
import VideoRecord from "./VideoRecord";
import MediaTag from "./MediaTag";
const Schema = mongoose.Schema;
const MediaRecord = new Schema({
    type: String,
    title: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {type: [], index: true},
    campaigns: {type: [Schema.Types.ObjectId],
        ref: 'CampaignRecord',
        index: true},
    updatedBy: String
}, {
    strict: false,
    timestamps: true
});


export default mongoose.model("MediaRecord", MediaRecord);
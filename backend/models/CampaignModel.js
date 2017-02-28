import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Campaign = new Schema({
    title: {
        type: String,
        required: true,
    },
    updatedBy: String
}, {
    timestamps: true
});


// export default mongoose.model("Campaign", Campaign);
export default MediaTag;
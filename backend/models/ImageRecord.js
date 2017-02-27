import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ImageRecord = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    height: Number,
    width: Number,
    format: String,
    customizeable: {
        type: Boolean,
        default: false
    },
    tags:{type: [String], required: true},
    updatedBy: String
}, {
    timestamps: true
});


// export default mongoose.model("ImageRecord", ImageRecord);
export default ImageRecord;
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
    customizeable: {
        type: Boolean,
        default: false
    },
    updatedBy: String
}, {
    timestamps: true
});


// export default mongoose.model("ImageRecord", ImageRecord);
export default ImageRecord;
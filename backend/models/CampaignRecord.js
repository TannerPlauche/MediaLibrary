import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CampaignRecord = new Schema({
    title: {
        type: String,
        required: true,
    },
    records: {
        type: [Schema.Types.ObjectId],
        ref: 'MediaRecord',
    },
    updatedBy: String
}, {
    strict: false,
    timestamps: true
});


// export default mongoose.model("Campaign", Campaign);
export default mongoose.model("CampaignRecord", CampaignRecord);
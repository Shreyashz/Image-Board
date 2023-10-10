import mongoose, { Schema } from "mongoose";

const threadSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const thread = mongoose.model('Thread', threadSchema);

export default thread;
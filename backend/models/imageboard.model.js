import mongoose, { Schema } from "mongoose";

const imageboardSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    imageLink:{
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    IP: {
        type: String
    },
    options: {
        type: String
    },
    subject: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const board = mongoose.model('ImageBoard', imageboardSchema);

export default board ;
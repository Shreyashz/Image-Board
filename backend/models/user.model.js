import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        unique: true
    },
}, {
    timestamps: true,
});

const user = mongoose.model('User', userSchema);

export default user;
import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, }  
})

export default mongoose.model('User', User)
import mongoose from "mongoose";

const Message = new mongoose.Schema({
    username: {type: String, required: true},
    message: {type: String, required: true}, 
})

export default mongoose.model('Message', Message)
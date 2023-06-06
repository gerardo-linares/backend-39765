import mongoose from 'mongoose';

const registerCollection = "users";

const registerSchema = new mongoose.Schema({
    firstName:  String,
    lastName: String,
    email: String,
    password: String,
    role: {
        type:String, 
        default:"user"

    }
    
},{timestamps:true});

const userModel = mongoose.model(registerCollection, registerSchema);

export default userModel;

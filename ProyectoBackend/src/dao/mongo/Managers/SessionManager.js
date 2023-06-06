
import userModel from "../models/user.js";

export default class SessionManager {
    registerUser = (userData) => {
        return userModel.create(userData);
    };

    loginUser = async (email) => {
        const user = await userModel.findOne({ email});
        return user;
    };

    findUser = (email) =>{
        return userModel.findOne({email})

    }

}

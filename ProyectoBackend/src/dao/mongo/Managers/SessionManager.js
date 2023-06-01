
import userModel from "../models/user.js";

export default class SessionManager {
    registerUser = (userData) => {
        return userModel.create(userData);
    };

    loginUser = async (email, password) => {
        const user = await userModel.findOne({ email, password });
        return user;
    };
}

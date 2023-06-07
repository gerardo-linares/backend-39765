
import userModel from "../models/user.js";

export default class SessionManager {
    registerUser = (userData) => {
        return userModel.create(userData);
    };

    loginUser = async (email) => {
        const user = await userModel.findOne({ email});
        return user;
    };
}


//OPCION PARA REUTILIZAR EN PASSPORT // A REVISAR
// findUserBy = async (field, value) => {
//     const query = {};
//     query[field] = value;
//     const user = await userModel.findOne(query);
//     return user;
//   };

//   const userByEmail = await sessionManager.findUserBy("email", email);
// const userById = await sessionManager.findUserBy("_id", id);
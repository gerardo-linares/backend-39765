import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bycrpt from 'bcrypt'



export const createHash = async(password) =>{
    //genera salts
    const salts = await bycrpt.genSalt(10)
    return bycrpt.hash(password,salts);

}

export const validatePassword = (password,hashedPassword) => bycrpt.compare(password,hashedPassword);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;
import multer from 'multer';
import __dirname from '../utils';

const storage = multer.diskStorage({
    //Carpeta
    destination: function(req, file, cb) {
        cb(null, `${__dirname}/public/img`)
    },
    filename: function(req, file, cb) {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
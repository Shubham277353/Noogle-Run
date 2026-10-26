import {randomUUID} from 'node:crypto';
import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "uploads")
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, `${randomUUID()}${extension}`);
    },
})


const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "application/pdf",
            "image/png",
            "image/jpg",
        ]

        if(allowedTypes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error("Unsupported file type"));
        }
    },

});

export default upload;
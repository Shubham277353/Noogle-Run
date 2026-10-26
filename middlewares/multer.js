import {randomUUID} from 'node:crypto';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, '../uploads')
    },
    filename: (req, file, cb) => {
        const fileName = randomUUID();
        
    }
})
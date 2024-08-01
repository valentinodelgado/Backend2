import multer from "multer";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null,dirname(__dirname) + "/public/img")
    },
    filename: (req, file, callback)=>{
        callback(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploader= multer({storage})

export default uploader
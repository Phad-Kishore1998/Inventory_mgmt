import { fileLoader } from "ejs";
import multer from "multer";

//We have to specify destination and filename of the file
//diskstorage function: returns a StorageEngine implementation configured to store files
//on the local file system parameters are destination object a callback function and filename
const storageConfig = multer.diskStorage({
    destination:(req,file, cb) =>{
        cb(null, 'public/images/');
    },
    filename: (req,file, cb) => {
        //null is for no error
        //appending the current timestamp for unique name to files.
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

export const uploadFile = multer({
    storage: storageConfig,
});

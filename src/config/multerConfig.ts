import multer from "multer";
import path from "path";

const bookStorage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path.resolve(__dirname, "../../books/"));
    },
    filename: function (_req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const docStorage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path.resolve(__dirname, "../../docs/"));
    },
    filename: function (_req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

export { bookStorage, docStorage };
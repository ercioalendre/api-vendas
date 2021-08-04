import multer from "multer";
import path from "path";
// import crypto from "crypto";

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    async filename(req, file, callback) {
      const timestamp = new Date().getTime();
      const [, fileExtension] = file.originalname.split(".");
      const filename = `avatar-${req.user.id}-${timestamp}.${fileExtension}`;
      callback(null, filename);
    },
  }),
};

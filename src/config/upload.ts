import multer, { StorageEngine } from "multer";
import path from "path";

interface IUploadSettings {
  driver: "s3" | "local-disk";
  tempFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  settings: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    disk: any;
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");
const tempFolder = path.resolve(__dirname, "..", "..", "temp");

export default {
  driver: process.env.STORAGE_DRIVER,
  tempFolder,
  directory: uploadFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      async filename(req, file, callback) {
        const timestamp = new Date().getTime();
        const [, fileExtension] = file.originalname.split(".");
        const filename = `avatar-${req.user.id}-${timestamp}.${fileExtension}`;
        callback(null, filename);
      },
    }),
  },
  settings: {
    disk: {},
    aws: {
      bucket: process.env.AWS_S3_BUCKET,
    },
  },
} as IUploadSettings;

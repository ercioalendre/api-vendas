import multer, { StorageEngine } from "multer";
import path from "path";
import AppError from "@shared/errors/AppError";

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
const maxFileSize = Number(process.env.UPLOAD_FILE_MAX_SIZE) * 1024 * 1024;
const allowedMimes =
  process.env.UPLOAD_ALLOWED_FILE_TYPES !== undefined
    ? JSON.parse(process.env.UPLOAD_ALLOWED_FILE_TYPES)
    : new AppError("Upload failed.");

export default {
  driver: process.env.STORAGE_DRIVER,
  tempFolder,
  directory: uploadFolder,
  multer: {
    limits: {
      fileSize: maxFileSize,
    },
    storage: multer.diskStorage({
      destination: tempFolder,
      async filename(req, file, callback) {
        const timestamp = new Date().getTime();
        const [, fileExtension] = file.originalname.split(".");
        const filename = `avatar-${req.user.id}-${timestamp}.${fileExtension}`;
        callback(null, filename);
      },
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileFilter: (req: Request, file: any, callback: any) => {
      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(
          new AppError(
            "The file you are trying to send has an invalid extension.",
          ),
        );
      }
    },
  },
  settings: {
    disk: {},
    aws: {
      bucket: process.env.AWS_S3_BUCKET,
    },
  },
} as IUploadSettings;

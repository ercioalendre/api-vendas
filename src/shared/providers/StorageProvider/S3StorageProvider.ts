import fs from "fs";
import path from "path";
import mime from "mime";
import aws, { S3 } from "aws-sdk";
import upload from "@config/upload";

class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tempFolder, file);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error("File not found.");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: upload.settings.aws.bucket,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: upload.settings.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export const s3StorageProvider = new S3StorageProvider();
export default s3StorageProvider;

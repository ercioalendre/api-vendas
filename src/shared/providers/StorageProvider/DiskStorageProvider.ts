import fs from "fs";
import path from "path";
import uploadSettings from "@config/upload";

class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadSettings.tempFolder, file),
      path.resolve(uploadSettings.directory, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadSettings.directory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export const diskStorageProvider = new DiskStorageProvider();
export default diskStorageProvider;

import fs from "fs";
import path from "path";

export const deleteFile = async (pathToFile) => {
  try {
    const filePath = path.resolve(pathToFile);
    await fs.promises.access(filePath, fs.constants.F_OK);
    await fs.promises.unlink(filePath);

    console.log("File deleted successfully");
  } catch {
    console.log("Operation failed");
  }
};

import fs from "fs";
import path from "path";

export const rename = async (filePath, newFileName) => {
  try {
    const sourceFilePath = path.resolve(filePath);
    const destinationFilePath = path.join(
      path.dirname(sourceFilePath),
      newFileName
    );

    await fs.promises.rename(sourceFilePath, destinationFilePath);

    console.log("File renamed successfully");
  } catch {
    console.log("Operation failed");
  }
};

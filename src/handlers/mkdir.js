import fs from "fs";
import path from "path";

export const makeDir = async (dirName, currentDirectory = process.cwd()) => {
  if (!dirName) {
    console.log("Invalid input folder");
    return;
  }

  try {
    const absolutePath = path.resolve(currentDirectory, dirName);

    await fs.promises.mkdir(absolutePath);

    console.log(`Directory created: ${absolutePath}`);
  } catch (err) {
    console.log("Operation failed");
  }
};

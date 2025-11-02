import { cwd } from "process";
import path from "path";
import fs from "fs";

export const changeDirectory = (directoryPath, currentDirectory) => {
  try {
    const targetPath = path.resolve(currentDirectory, directoryPath);

    const stats = fs.statSync(targetPath);
    if (!stats.isDirectory()) {
      console.log("Operation failed");
      return currentDirectory;
    }

    const root = path.parse(currentDirectory).root;
    if (!targetPath.startsWith(root)) {
      console.log("Operation failed");
      return currentDirectory;
    }

    process.chdir(targetPath);
    const newCurrentDirectory = cwd();
    console.log(`You are currently in ${newCurrentDirectory}`);
    return newCurrentDirectory;
  } catch {
    console.log("Operation failed");
    return currentDirectory;
  }
};

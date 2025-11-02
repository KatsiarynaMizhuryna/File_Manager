import path from "path";
import { cwd } from "process";

export const goUp = () => {
  try {
    const currentDirectory = cwd();
    const parentDirectory = path.resolve(currentDirectory, "..");

    if (currentDirectory !== parentDirectory) {
      process.chdir(parentDirectory);
    }

    console.log(`You are currently in ${cwd()}`);
  } catch {
    console.log("Operation failed");
  }
};

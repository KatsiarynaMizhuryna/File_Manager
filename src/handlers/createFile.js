import { cwd } from "process";
import path from "path";
import fs from "fs";

export const createFile = async (fileName) => {
  try {
    const filePath = path.join(cwd(), fileName);

    await fs.promises
      .access(filePath, fs.constants.F_OK)
      .then(() => {
        console.log("Operation failed");
        return;
      })
      .catch(async () => {
        await fs.promises.writeFile(filePath, "");
        console.log("Empty file created successfully");
      });
  } catch {
    console.log("Operation failed");
  }
};

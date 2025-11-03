import fs from "fs";
import path from "path";
import { createHash } from "node:crypto";

export const calculateHash = async (filePath) => {
  try {
    const sourceFile = path.resolve(filePath);

    await fs.promises.access(sourceFile, fs.constants.F_OK);

    const hash = createHash("sha256");
    const readableStream = fs.createReadStream(sourceFile);

    return new Promise((resolve, reject) => {
      readableStream.on("data", (chunk) => hash.update(chunk));

      readableStream.on("error", () => {
        console.log("Operation failed");
        reject();
      });

      readableStream.on("end", () => {
        const hashResult = hash.digest("hex");
        console.log(hashResult);
        resolve(hashResult);
      });
    });
  } catch {
    console.log("Operation failed");
  }
};

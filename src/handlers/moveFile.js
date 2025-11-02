import fs from "fs";
import path from "path";

export const move = async (pathToFile, pathToDirectory) => {
  try {
    const sourceFile = path.resolve(pathToFile);
    const destinationDir = path.resolve(pathToDirectory);
    const fileName = path.basename(sourceFile);
    const destinationFile = path.join(destinationDir, fileName);

    await fs.promises.access(sourceFile, fs.constants.R_OK);
    await fs.promises.access(destinationDir, fs.constants.W_OK);

    const readableStream = fs.createReadStream(sourceFile);
    const writableStream = fs.createWriteStream(destinationFile);

    await new Promise((resolve, reject) => {
      readableStream
        .pipe(writableStream)
        .on("finish", resolve)
        .on("error", reject);

      readableStream.on("error", reject);
    });

    await fs.promises.unlink(sourceFile);

    console.log("File moved successfully");
  } catch {
    console.log("Operation failed");
  }
};

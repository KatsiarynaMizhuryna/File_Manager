import fs from "fs";
import zlib from "zlib";
import path from "path";

export const compress = async (inputFile, destinationDir) => {
  try {
    const inputFilePath = path.resolve(inputFile);
    const destinationPath = path.resolve(destinationDir);
    const fileName = path.basename(inputFilePath);
    const compressedFilePath = path.join(destinationPath, `${fileName}.br`);

    await fs.promises.access(inputFilePath, fs.constants.F_OK);
    await fs.promises.access(destinationPath, fs.constants.W_OK);

    const brotli = zlib.createBrotliCompress();
    const source = fs.createReadStream(inputFilePath);
    const destination = fs.createWriteStream(compressedFilePath);

    await new Promise((resolve, reject) => {
      source
        .pipe(brotli)
        .pipe(destination)
        .on("finish", resolve)
        .on("error", reject);
    });

    console.log(`File successfully compressed to ${compressedFilePath}`);
  } catch {
    console.log("Operation failed");
  }
};

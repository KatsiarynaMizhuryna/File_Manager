import fs from "fs";
import zlib from "zlib";
import path from "path";

export const decompress = async (inputFile, destinationDir) => {
  try {
    const inputFilePath = path.resolve(inputFile);
    const destinationPath = path.resolve(destinationDir);

    const originalFileName = path.basename(inputFilePath).replace(/\.br$/, "");
    const outputFilePath = path.join(destinationPath, originalFileName);

    await fs.promises.access(inputFilePath, fs.constants.F_OK);
    await fs.promises.access(destinationPath, fs.constants.W_OK);

    const brotli = zlib.createBrotliDecompress();
    const source = fs.createReadStream(inputFilePath);
    const destination = fs.createWriteStream(outputFilePath);

    await new Promise((resolve, reject) => {
      source
        .pipe(brotli)
        .pipe(destination)
        .on("finish", resolve)
        .on("error", reject);

      source.on("error", reject);
    });

    console.log(`File successfully decompressed to ${outputFilePath}`);
  } catch {
    console.log("Operation failed");
  }
};

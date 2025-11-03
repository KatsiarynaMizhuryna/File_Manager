export const cat = async (filePath, currentDirectory = process.cwd()) => {
  try {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.join(currentDirectory, filePath);

    await fs.promises.access(absolutePath, fs.constants.R_OK);

    const readableStream = fs.createReadStream(absolutePath, {
      encoding: "utf8",
    });

    await new Promise((resolve, reject) => {
      readableStream
        .on("data", (chunk) => process.stdout.write(chunk))
        .on("end", resolve)
        .on("error", reject);
    });

    console.log();
  } catch {
    console.log("Operation failed");
  }
};

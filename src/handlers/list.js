import fs from "fs";
import { cwd } from "process";

export const ls = async () => {
  try {
    const currentDirectory = cwd();
    const files = await fs.promises.readdir(currentDirectory, {
      withFileTypes: true,
    });

    const folders = files
      .filter((file) => file.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name));

    const regularFiles = files
      .filter((file) => file.isFile())
      .sort((a, b) => a.name.localeCompare(b.name));

    const tableData = [...folders, ...regularFiles].map((file, index) => ({
      index,
      Name: file.name,
      Type: file.isDirectory() ? "directory" : "file",
    }));

    console.table(tableData);
  } catch {
    console.log("Operation failed");
  }
};

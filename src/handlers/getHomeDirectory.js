import os from "os";

export const getHomeDir = () => {
  try {
    console.log(os.homedir());
  } catch {
    console.log("Operation failed");
  }
};

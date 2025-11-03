import os from "os";

export const getUsername = () => {
  try {
    console.log(os.userInfo().username);
  } catch {
    console.log("Operation failed");
  }
};

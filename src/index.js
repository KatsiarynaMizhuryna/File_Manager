import { createInterface } from "readline";
import { cwd, chdir } from "process";
import path from "path";
import os from "os";

import { copyFile } from "./handlers/copyFile.js";
import { goUp } from "./handlers/up.js";
import { changeDirectory } from "./handlers/changeDirectory.js";
import { ls } from "./handlers/list.js";
import { cat } from "./handlers/readFile.js";
import { rename } from "./handlers/renameFile.js";
import { move } from "./handlers/moveFile.js";
import { makeDir } from "./handlers/mkdir.js";
import { deleteFile } from "./handlers/deleteFile.js";
import { getEOL } from "./handlers/getEOL.js";
import { getCPUs } from "./handlers/getCPUs.js";
import { getHomeDir } from "./handlers/getHomeDirectory.js";
import { getUsername } from "./handlers/getUsername.js";
import { getArchitecture } from "./handlers/getArchitecture.js";
import { calculateHash } from "./handlers/calculateHash.js";
import { compress } from "./handlers/compressFile.js";
import { decompress } from "./handlers/decompressFile.js";
import { createFile } from "./handlers/createFile.js";

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Anonymous";

let currentDirectory = os.homedir();
chdir(currentDirectory);

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDirectory}`);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
);

process.on("SIGINT", () => process.exit(0));

const updateCurrentDirectory = () => {
  console.log(`You are currently in ${currentDirectory}`);
};

const processCommand = async (commandLine) => {
  const [cmd, ...args] = commandLine.trim().split(/\s+/);

  try {
    switch (cmd) {
      case ".exit":
        process.exit();

      case "up":
        goUp();
        currentDirectory = cwd();
        break;

      case "cd":
        currentDirectory = changeDirectory(args[0], currentDirectory);
        break;

      case "ls":
        await ls();
        break;

      case "cat":
        await cat(args[0], currentDirectory);
        break;

      case "add":
        await createFile(args[0]);
        break;

      case "mkdir":
        await makeDir(args[0], currentDirectory);
        break;

      case "rn":
        await rename(args[0], args[1]);
        break;

      case "cp":
        await copyFile(args[0], args[1]);
        break;

      case "mv":
        await move(args[0], args[1]);
        break;

      case "rm":
        await deleteFile(args[0]);
        break;

      case "os":
        if (!args[0]) {
          console.log("Invalid input");
          break;
        }
        switch (args[0].toLowerCase()) {
          case "--eol":
            getEOL();
            break;
          case "--cpus":
            getCPUs();
            break;
          case "--homedir":
            getHomeDir();
            break;
          case "--username":
            getUsername();
            break;
          case "--architecture":
            getArchitecture();
            break;
          default:
            console.log("Invalid input");
        }
        break;

      case "hash":
        await calculateHash(args[0]);
        break;

      case "compress":
        await compress(args[0], args[1]);
        break;

      case "decompress":
        await decompress(args[0], args[1]);
        break;

      default:
        console.log("Invalid input");
        break;
    }
  } catch (err) {
    console.error("Operation failed");
  } finally {
    currentDirectory = cwd();
    updateCurrentDirectory();
  }
};

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (trimmed) await processCommand(trimmed);
  rl.prompt();
});

rl.prompt();

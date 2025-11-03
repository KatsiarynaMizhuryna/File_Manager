import os from "os";

export const getCPUs = () => {
  try {
    const cpus = os.cpus();
    console.log(`Overall CPUs: ${cpus.length}`);

    cpus.forEach((cpu) => {
      console.log(`Model: ${cpu.model}`);
      console.log(`Speed: ${(cpu.speed / 1000).toFixed(1)} GHz`);
    });
  } catch {
    console.log("Operation failed");
  }
};

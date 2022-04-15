import { dirname } from "path";
import { fileURLToPath } from "url";
import process from "process";

export const commandArgs = process.argv[2];
export const __dirname = dirname(fileURLToPath(import.meta.url));
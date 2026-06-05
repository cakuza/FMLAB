import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const target = resolve(process.cwd(), ".next");

await rm(target, { force: true, recursive: true });

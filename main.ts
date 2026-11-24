import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "line.txt");
const targetDir = "/output";
const targetPath = join(targetDir, "entry.txt");

const MIN = 1;
const MAX = 240;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const raw = await readFile(sourcePath, "utf8");
const line = raw.endsWith("\n") ? raw.slice(0, -1) : raw;

if (line.includes("\n") || line.includes("\r")) fail("line.txt must hold exactly one line");
if (line.trim().length === 0) fail("line.txt must not be blank");
if (line.length < MIN || line.length > MAX) {
  fail(`line must be ${MIN}-${MAX} characters, got ${line.length}`);
}

await mkdir(targetDir, { recursive: true });
await writeFile(targetPath, line, "utf8");
console.log(`wrote ${line.length} characters to ${targetPath}`);

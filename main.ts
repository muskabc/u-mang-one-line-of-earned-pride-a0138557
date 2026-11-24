import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const limits = { shortest: 1, longest: 240 };
const source = new URL("line.txt", import.meta.url);
const destination = "/output/entry.txt";

function run(): void {
  const bytes = readFileSync(source);
  const text = bytes.toString("utf8").replace(/\r?\n$/, "");

  const singleLine = /^[^\r\n]+$/.test(text);
  if (!singleLine) {
    throw new Error("line.txt must contain exactly one line of text");
  }
  if (text.trim() === "") {
    throw new Error("line.txt must not be blank");
  }
  if (text.length < limits.shortest || text.length > limits.longest) {
    throw new Error(
      `line must be ${limits.shortest} to ${limits.longest} characters long, found ${text.length}`,
    );
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(destination, text, { encoding: "utf8", flag: "w" });
  console.log(`entry written: ${text.length} characters -> ${destination}`);
}

try {
  run();
} catch (err) {
  console.error(`error: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
}

import path from "path";
import fs from "fs/promises";
import { parseArgs } from "util";

const { values } = parseArgs({
  strict: true,
  args: Bun.argv,
  allowPositionals: true,
  options: { v: { type: 'string' } },
});

const file = await fs.readFile(
  path.join(process.cwd(), "package.json"),
  "utf-8",
);

const packageJson = JSON.parse(file);
const version = values.v?.replace?.("v", "");

if (!version) throw new Error("Invalid version code");
packageJson.version = version;

await fs.writeFile(
  path.join(process.cwd(), "package.json"),
  JSON.stringify(packageJson),
  "utf-8",
);

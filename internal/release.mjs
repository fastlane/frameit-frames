// Snapshots `latest/` into a new versioned folder named after a unix timestamp.
// Usage: npm run release [-- <version>]

import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const latest = join(root, "latest");

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function isIdentical(a, b) {
  const files = (dir) =>
    readdirSync(dir)
      .filter((name) => name !== "version.txt")
      .sort();
  const aFiles = files(a);
  const bFiles = files(b);
  if (aFiles.join("\n") !== bFiles.join("\n")) return false;

  return aFiles.every((name) => readFileSync(join(a, name)).equals(readFileSync(join(b, name))));
}

const version = process.argv[2] ?? String(Math.floor(Date.now() / 1000));
if (!/^\d+$/.test(version)) fail(`version must be a unix timestamp, got '${version}'.`);
if (existsSync(join(root, version))) fail(`folder '${version}' already exists.`);

const previous = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name))
  .map((entry) => entry.name)
  .sort((a, b) => Number(a) - Number(b))
  .at(-1);

if (previous) {
  if (Number(version) <= Number(previous)) {
    fail(`version '${version}' must be newer than '${previous}'.`);
  }
  if (isIdentical(latest, join(root, previous))) {
    fail(`'latest' is identical to '${previous}', nothing to release.`);
  }
}

writeFileSync(join(latest, "version.txt"), `${version}\n`);
cpSync(latest, join(root, version), { recursive: true });

console.log(`Created ${version}/ from latest/ (previous: ${previous ?? "none"}).`);

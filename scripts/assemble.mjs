// assemble.mjs: build our FoxOne-based files from vendor/ plus patches/.
//
// Usage (from the repo root):   node scripts/assemble.mjs
//                               node scripts/assemble.mjs --version 1.0.4
//
// With --version, FoxMica's own version (the VERSION file) is set first and then the build runs, so the
// number in VERSION and the number in the built files' headers can't disagree. If the build fails,
// VERSION is put back as it was.
//
// Why: the files FoxMica ships on top of FoxOne are never edited by hand. They are made from the
// untouched FoxOne file in vendor/ and our changes in patches/, so a new FoxOne release is one
// pull (scripts/pull-foxone.mjs) and one rebuild, and every change of ours is a small file you can read.
//
// All files are built in memory first; if any patch fails to apply, nothing is written and the
// failing patch is named. It does not commit or push anything.

import { readFile, writeFile } from "node:fs/promises";
import { TARGETS, build } from "./patchlib.mjs";

// Optional: --version <x.y.z>. Plain numbers like 1.0.4, or with a suffix like 1.0.5-dev; no "v".
let oldVersionFile = null; // the VERSION file as it was, so a failed build can put it back
const flag = process.argv.indexOf("--version");
if (flag !== -1) {
  const wanted = process.argv[flag + 1];
  if (!wanted || !/^\d+\.\d+\.\d+(-[0-9A-Za-z.]+)?$/.test(wanted)) {
    console.error("Give a version, like:  node scripts/assemble.mjs --version 1.0.4");
    process.exit(1);
  }
  oldVersionFile = await readFile("VERSION", "utf8");
  await writeFile("VERSION", `${wanted}\n`);
  console.log(`VERSION set to ${wanted}`);
}

const results = [];
for (const target of TARGETS) results.push({ target, result: await build(target) });

let failed = false;
for (const { target, result } of results) {
  for (const p of result.problems) {
    console.error(`PROBLEM  ${target.name}: ${p}`);
    failed = true;
  }
  for (const f of result.other) console.warn(`note     ${target.patchDir}/${f} is not a .patch or .css file, so it is ignored`);
}
if (failed) {
  if (oldVersionFile !== null) await writeFile("VERSION", oldVersionFile);
  console.error("Nothing was written.");
  process.exit(1);
}

for (const { target, result } of results) {
  await writeFile(target.out, result.text);
  console.log(`built ${target.out}: ${result.applied} patch(es), ${result.appended} block(s) added`);
}

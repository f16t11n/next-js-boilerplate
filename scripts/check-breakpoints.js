/* eslint-disable @typescript-eslint/no-require-imports */
// CommonJS script (no ESM) to allow execution in Node without transpilation.
// The required file is the CJS mirror (breakpoints.js) kept in sync with breakpoints.ts.
const { breakpoints } = require('../config/breakpoints');
const fs = require('fs');
const path = require('path');

const allowed = Object.values(breakpoints);
const projectRoot = path.resolve(__dirname);

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (/(js|ts|tsx|css|scss|md|json)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/\d{2,4}px/g);
      if (matches) {
        for (const px of matches) {
          if (!allowed.includes(px)) {
            console.error(`Non-standard breakpoint ${px} found in ${fullPath}`);
            process.exit(1);
          }
        }
      }
    }
  }
}

scanDir(projectRoot);
console.log('All breakpoints are valid.');

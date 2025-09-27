import { breakpoints } from '../config/breakpoints';

/**
 * This script checks for any usage of non-standard breakpoints in the codebase.
 * It scans for px values in media queries and style code, and fails if any are not in /config/breakpoints.ts.
 */

import fs from 'fs';
import path from 'path';

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

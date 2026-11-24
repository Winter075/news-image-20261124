// main.ts — hands the 24 November 2026 news image to the grader.
// Authored in the recorded build session. Standard library only, no network.
// Revised to check the source before copying, so a missing asset fails loudly.

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(here, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png is missing from the repository');
}

mkdirSync(out, { recursive: true });
copyFileSync(source, join(out, 'entry.png'));

const size = statSync(join(out, 'entry.png')).size;
if (size === 0 || size > 1024 * 1024) {
  throw new Error(`entry.png has an unexpected size: ${size}`);
}

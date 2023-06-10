import { writeFile } from 'node:fs/promises';
import { join } from 'path';

export const writeIndex = (path: string, html: string) => writeFile(join(path, 'index.html'), html);

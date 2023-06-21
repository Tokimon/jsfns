import { readdir } from 'node:fs/promises';
import path from 'path';

async function getFolderNames(path: string) {
  const entries = await readdir(path, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map(({ name }) => name);
}

export async function getPackageVersions(root: string) {
  const structure: Record<string, string[]> = {};

  try {
    const pkgs = await getFolderNames(root);

    for (const pkg of pkgs) {
      const versions = await getFolderNames(path.join(root, pkg));
      if (versions.length) structure[pkg] = versions;
    }

    return structure;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return structure;
  }
}

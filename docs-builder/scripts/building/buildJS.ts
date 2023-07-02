import { type BuildOptions, build } from 'esbuild';
import path from 'path';

export async function buildJS() {
  const options: BuildOptions = {
    entryPoints: [path.resolve('assets/index.ts')],
    bundle: true,
    minify: true,
    sourcemap: false,
    write: false,
    outdir: 'out',
  };

  const result = await build(options);

  return result.outputFiles?.[0]?.text;
}

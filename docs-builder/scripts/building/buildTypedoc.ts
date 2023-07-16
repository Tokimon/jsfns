import { writeFileSync } from 'fs';
import path from 'path';
import TypeDoc from 'typedoc';

export function buildTypedoc(packagePath: string) {
  const packageSrcPath = path.join(packagePath, 'src');
  const app = new TypeDoc.Application();

  app.options.addReader(new TypeDoc.TSConfigReader());

  app.bootstrap({
    entryPointStrategy: 'expand',
    readme: 'none',
    tsconfig: path.join(packagePath, 'tsconfig.js.json'),
    exclude: ['**/index.*'],
    entryPoints: [packageSrcPath],
  });

  const project = app.convert();

  if (!project) throw app.logger.errorCount;

  const json = app.serializer.projectToObject(project, packagePath);

  writeFileSync(path.join(packagePath, 'doc.json'), JSON.stringify(json, null, 2));

  return json;
}

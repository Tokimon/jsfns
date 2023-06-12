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
    exclude: ['**/index.*', '**/types.d.ts'],
    entryPoints: [packageSrcPath],
  });

  const project = app.convert();

  if (!project) throw app.logger.errorCount;

  return app.serializer.projectToObject(project, packagePath);
}

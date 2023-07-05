import ejs from 'ejs';
import { resolve } from 'path';
import { writeIndex } from './writeIndex';

type RenderIndexProps = {
  path: string;
  template: string;
  data: ejs.Data;
};

export const renderIndex = async ({ path, template, data }: RenderIndexProps) => {
  const html = await ejs.renderFile(resolve('templates', template + '.ejs'), data, {
    async: true,
  });
  await writeIndex(path, html);
};

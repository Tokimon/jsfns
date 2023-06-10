import ejs from 'ejs';
import { resolve } from 'path';
import { writeIndex } from './writeIndex';

export const renderHTML = async (template: string, data: ejs.Data) =>
  ejs.renderFile(resolve('templates', template + '.ejs'), data, {
    async: true,
  });

type RenderIndexProps = {
  path: string;
  template: string;
  data: ejs.Data;
};

export const renderIndex = async ({ path, template, data }: RenderIndexProps) => {
  const html = await renderHTML(template, data);
  await writeIndex(path, html);
};

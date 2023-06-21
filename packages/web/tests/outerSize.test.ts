import { outerSize } from '@js-fns/web/outerSize';
import viewport from '@js-fns/web/viewport';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('outerSize');

describe('outerSize', () => {
  let testNode: HTMLElement;

  const width = 100;
  const height = 100;
  const border = 2;
  const margin = 10;
  const padding = 5;

  beforeAll(() => {
    insertHtml(`
      <div
        id="${testID}"
        style="width: ${width}px; height: ${height}px; border: ${border}px solid; margin: ${margin}px; padding: ${padding}px;"
      />
    `);

    testNode = byId(testID);
  });

  afterAll(() => {
    removeElement(testID);
  });

  it('Returns the outer size of the given element, including margins', () => {
    expect(outerSize(testNode)).toEqual({
      width: width + padding * 2 + border * 2,
      height: width + padding * 2 + border * 2,
    });
  });

  it('When given window it returns the windows outer size', () => {
    const vp = viewport(window) as HTMLElement;
    expect(outerSize(window)).toEqual(outerSize(vp));
  });

  it('When given document it returns the outer size of the viewport, including borders', () => {
    const vp = viewport(document) as HTMLElement;
    expect(outerSize(document)).toEqual(outerSize(vp));
  });
});

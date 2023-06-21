import { marginBoxSize } from '@js-fns/web/marginBoxSize';
import viewport from '@js-fns/web/viewport';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('marginBoxSize');

describe('marginBoxSize', () => {
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

  it('Returns the outer size of the given element, including margins and borders', () => {
    expect(marginBoxSize(testNode)).toEqual({
      width: width + padding * 2 + margin * 2 + border * 2,
      height: width + padding * 2 + margin * 2 + border * 2,
    });
  });

  describe('Returns the outer size of the viewport, including margins and borders', () => {
    it('When given window', () => {
      const vp = viewport(window) as HTMLElement;
      expect(marginBoxSize(window)).toEqual(marginBoxSize(vp));
    });

    it('When given document', () => {
      const vp = viewport(document) as HTMLElement;
      expect(marginBoxSize(document)).toEqual(marginBoxSize(vp));
    });
  });
});

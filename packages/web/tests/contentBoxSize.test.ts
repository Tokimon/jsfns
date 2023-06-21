import { contentBoxSize } from '@js-fns/web/contentBoxSize';
import viewport from '@js-fns/web/viewport';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('contentBoxSize');

describe('contentBoxSize', () => {
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

  it('Returns the inner size of the given element, excluding padding', () => {
    expect(contentBoxSize(testNode)).toEqual({ width, height });
  });

  describe('Returns the inner size of the viewport, excluding padding', () => {
    it('When given window', () => {
      const vp = viewport(window) as HTMLElement;
      expect(contentBoxSize(window)).toEqual(contentBoxSize(vp));
    });

    it('When given document', () => {
      const vp = viewport(document) as HTMLElement;
      expect(contentBoxSize(document)).toEqual(contentBoxSize(vp));
    });
  });
});

import { contentSize } from '@js-fns/web/contentSize';
import viewport from '@js-fns/web/viewport';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('contentSize');

describe('contentSize', () => {
  let testNode: HTMLElement;

  const width = 100;
  const height = 100;
  const border = 2;
  const margin = 10;
  const padding = 5;

  const innerWidth = width * 3;
  const innerHeight = height * 3;

  beforeAll(() => {
    insertHtml(`
      <div
        id="${testID}"
        style="width: ${width}px; height: ${height}px; border: ${border}px solid; margin: ${margin}px; padding: ${padding}px;"
      ><div style="width: ${innerWidth}px; height: ${innerHeight}px"/></div>
    `);

    testNode = byId(testID);
  });

  afterAll(() => {
    removeElement(testID);
  });

  it('Returns the size of the content of a given element, excluding element padding', () => {
    expect(contentSize(testNode)).toEqual({
      width: innerWidth,
      height: innerHeight,
    });
  });

  describe('Returns the size of the content of the viewport, excluding element padding', () => {
    it('When given window', () => {
      const vp = viewport(window) as HTMLElement;
      expect(contentSize(window)).toEqual(contentSize(vp));
    });

    it('When given document', () => {
      const vp = viewport(document) as HTMLElement;
      expect(contentSize(document)).toEqual(contentSize(vp));
    });
  });
});

import { innerSize } from '@jsfns/web/innerSize';
import { viewport } from '@jsfns/web/viewport';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('innerSize');

describe('innerSize', () => {
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
      ></div>
    `);

    testNode = byId(testID);
  });

  afterAll(() => {
    removeElement(testID);
  });

  it('Returns the inner size of the given element, including padding', () => {
    expect(innerSize(testNode)).toEqual({
      width: testNode.clientWidth,
      height: testNode.clientHeight,
    });
  });

  describe('Returns the inner size of the viewport, including padding', () => {
    it('When given window', () => {
      const vp = viewport(window);
      expect(innerSize(window)).toEqual(innerSize(vp));
    });

    it('When given document', () => {
      const vp = viewport(document);
      expect(innerSize(document)).toEqual(innerSize(vp));
    });
  });
});

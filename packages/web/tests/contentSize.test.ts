import { contentSize } from '@jsfns/web/contentSize';
import { viewport } from '@jsfns/web/viewport';
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
        style="width: ${width}px; height: ${height}px; border: ${border}px solid; margin: ${margin}px; padding: ${padding}px; overflow: scroll"
      ></div>
    `);

    testNode = byId(testID);
  });

  afterAll(() => {
    removeElement(testID);
  });

  it('Returns the size of the content of a given element, excluding element padding', () => {
    // NOTE: I have to do it like this since jsDom doesn't render/calculates overflow correctly
    const MockElement = new Proxy(testNode, {
      get(target, property) {
        if (property === 'scrollWidth') return innerWidth + padding * 2;
        if (property === 'scrollHeight') return innerHeight + padding * 2;

        return target[property as keyof HTMLElement];
      },
    });

    expect(contentSize(MockElement)).toEqual({
      width: innerWidth,
      height: innerHeight,
    });
  });

  describe('Returns the size of the content of the viewport, excluding element padding', () => {
    it('When given window', () => {
      const vp = viewport(window);
      expect(contentSize(window)).toEqual(contentSize(vp));
    });

    it('When given document', () => {
      const vp = viewport(document);
      expect(contentSize(document)).toEqual(contentSize(vp));
    });
  });
});

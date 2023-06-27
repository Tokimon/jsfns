import { wrap } from '@jsfns/web/wrap';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('Wrap');
const elmID = generateId('Wrap_Elm');

describe('wrap', () => {
  beforeEach(() => {
    insertHtml(`
      <div id="${testID}">
        <div id="${elmID}"></div>
      </div>
    `);
  });

  afterEach(() => removeElement(testID));

  it('Returns null when no HTML given', () => {
    const elm = byId(elmID);
    const result = wrap(elm, '');

    expect(result).toBeNull();
    expect(elm.parentElement?.id).toBe(testID);
  });

  it('Returns wrapper element when element is successfully wrapped', () => {
    const elm = byId(elmID);
    const wrapperElm = createElement('div');
    const result = wrap(elm, wrapperElm);

    expect(result).toBe(wrapperElm);
    expect(elm.parentElement).toBe(wrapperElm);
  });

  it('Wraps element with given HTML', () => {
    const elm = byId(elmID);

    const result = wrap(elm, '<div class="wrapper"></div>');

    expect(result?.className).toBe('wrapper');
    expect(elm.parentElement?.className).toBe('wrapper');
  });

  it('Inserts the given element after the text in the wrap', () => {
    const elm = byId(elmID);

    const result = wrap(
      elm,
      `
      <div class="wrapper">
        some text here
      </div>
      `
    );

    expect(result?.className).toBe('wrapper');
    expect(elm.previousSibling?.nodeValue?.trim()).toBe('some text here');
  });

  describe('Nested html structure', () => {
    it('Wraps the element in the deepest child', () => {
      const elm = byId(elmID);

      const result = wrap(
        elm,
        `
        <div class="root">
          <div class="level1">
            <div class="wrapper"></div>
          </div>
        </div>
      `
      );

      expect(result?.className).toBe('root');
      expect(elm.parentElement?.className).toBe('wrapper');
      expect(elm.parentElement?.parentElement?.parentElement?.className).toBe('root');
    });

    it('Wraps the element in the first child', () => {
      const elm = byId(elmID);

      const result = wrap(
        elm,
        `
        <div class="root">
          <div class="wrapper"></div>
          <div class="not-the-wrapper"></div>
        </div>
      `
      );

      expect(result?.className).toBe('root');
      expect(elm.parentElement?.className).toBe('wrapper');
      expect(elm.parentElement?.parentElement?.className).toBe('root');
    });
  });
});

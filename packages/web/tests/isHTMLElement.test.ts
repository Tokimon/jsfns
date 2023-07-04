import { isHTMLElement } from '@jsfns/web/isHTMLElement';
import { appendFrame, createDetachedDocument } from './assets/helpers';

describe('"isHTMLElement"', () => {
  describe('Returns `true` for HTML element:', () => {
    describe.each([
      ['<html> element', (doc: Document) => doc.documentElement],
      ['<body> element', (doc: Document) => doc.body],
      ['<p> element', (doc: Document) => doc.createElement('p')],
    ])('%s', (_, getElm) => {
      it('In the current document', () => {
        expect(isHTMLElement(getElm(document))).toBe(true);
      });

      it('In a Frame', () => {
        const frame = appendFrame();

        expect(isHTMLElement(getElm(frame.contentDocument as Document))).toBe(true);

        frame.remove();
      });

      it('A HTML Element in a detached Document', () => {
        const doc = createDetachedDocument();
        expect(isHTMLElement(getElm(doc))).toBe(true);
      });
    });
  });

  describe('Returns `false` for non HTML element:', () => {
    it.each([
      ['Document', document],
      ['Fragment', document.createDocumentFragment()],
      ['Text Node', document.createTextNode('')],
      ['Comment Node', document.createComment('')],
      ['Window', window],
      ['NULL', null],
      ['Object', {}],
    ])('%s', (_, elm) => {
      expect(isHTMLElement(elm)).toBe(false);
    });
  });
});

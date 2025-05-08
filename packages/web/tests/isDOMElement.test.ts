import { isDOMElement } from '@jsfns/web/isDOMElement';
import { appendFrame, createDetachedDocument } from './assets/helpers';

describe('"isDOMElement"', () => {
	describe('Returns `true` for DOM element:', () => {
		describe.each([
			['<html> element', (doc: Document) => doc.documentElement],
			['<body> element', (doc: Document) => doc.body],
			['<p> element', (doc: Document) => doc.createElement('p')],
		])('%s', (_, getElm) => {
			it('In the current document', () => {
				expect(isDOMElement(getElm(document))).toBe(true);
			});

			it('In a Frame', () => {
				const frame = appendFrame();

				expect(isDOMElement(getElm(frame.contentDocument as Document))).toBe(true);

				frame.remove();
			});

			it('A DOM Element in a detached Document', () => {
				const doc = createDetachedDocument();
				expect(isDOMElement(getElm(doc))).toBe(true);
			});
		});
	});

	describe('Returns `false` for non DOM element:', () => {
		it.each([
			['Document', document],
			['Fragment', document.createDocumentFragment()],
			['Text Node', document.createTextNode('')],
			['Comment Node', document.createComment('')],
			['Window', window],
			['NULL', null],
			['Object', {}],
		])('%s', (_, elm) => {
			expect(isDOMElement(elm)).toBe(false);
		});
	});
});

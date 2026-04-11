import { innerXML } from '@jsfns/web/innerXML.js';
import { beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';

describe('"innerXML"', () => {
	describe('Returns the inner XML code of an XML element', () => {
		let xmlElm: Element;

		const innerHTML = `
      <firstname>John</firstname>
      <lastname>Doe</lastname>
    `;

		beforeEach(() => {
			const xml = `<Person>${innerHTML}</Person>`;

			xmlElm = new DOMParser()
				.parseFromString(xml, 'application/xml')
				.getElementsByTagName('Person')[0];
		});

		it('Using `innerHTML`', () => {
			expect(innerXML(xmlElm)).toBe(innerHTML);
		});

		it('When `innerHTML` is not present', () => {
			const mock: MockInstance<() => string | undefined> = vi.spyOn(xmlElm, 'innerHTML', 'get');

			mock.mockImplementation(() => undefined);

			expect(innerXML(xmlElm)).toBe(innerHTML);

			mock.mockRestore();
		});
	});
});

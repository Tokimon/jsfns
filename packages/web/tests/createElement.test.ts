import { createElement } from '@jsfns/web/createElement';

describe('"createElement"', () => {
	it('Creates a <div> element when no element is given', () => {
		expect(createElement().tagName).toBe('DIV');
	});

	it.each(['div', 'span', 'custom', 'input', 'br', 'img'])(
		'Creates a named element: "%s"',
		(tagName) => {
			const elm = createElement(tagName);
			expect(elm.tagName).toBe(tagName.toUpperCase());
		},
	);

	it('Creates element from css selector', () => {
		const elm = createElement('img[src="url.com"].my-img#ID') as HTMLImageElement;

		expect(elm.tagName).toBe('IMG');
		expect(elm.src).toBe('url.com');
		expect(elm.id).toBe('ID');
		expect(elm.className).toBe('my-img');
	});
});

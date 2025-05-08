import { parseSelector } from '@jsfns/web/parseSelector';

describe('"parseSelector"', () => {
	it('Defaults "tagName" to a DIV when empty string is given', () => {
		expect(parseSelector('').tagName).toBe('div');
	});

	it.each(['div', 'span', 'custom', 'input', 'br', 'img'])('Parses HTML element: "%s"', (tag) => {
		expect(parseSelector(tag).tagName).toBe(tag);
	});

	describe('Parsing ID', () => {
		it('Single given ID', () => {
			expect(parseSelector('#id').attributes.id).toBe('id');
		});

		it('Takes only the first of multiple given IDs', () => {
			expect(parseSelector('#id#id2').attributes.id).toBe('id');
		});

		it('Accepts "id" as mixed expressions (standard `#` expression takes precedence)', () => {
			const { attributes } = parseSelector('[id="attrId"]#normalId');
			expect(attributes.id).toBe('normalId');
		});

		it('Attributes containing "id" is not interpreted as id', () => {
			const { attributes } = parseSelector(
				'[splendid="oh my"][id-3="vw"][ideology="great"][my-id="mine"]',
			);
			expect(attributes).toEqual({
				splendid: 'oh my',
				'id-3': 'vw',
				ideology: 'great',
				'my-id': 'mine',
			});
		});

		it('Empty "id" attributes are ignored', () => {
			const { attributeList } = parseSelector('[id]');
			expect(attributeList).toHaveLength(0);
		});
	});

	describe('Parsing class name', () => {
		it('Single class name', () => {
			expect(parseSelector('.my-class').attributes.class).toBe('my-class');
		});

		it('Multiple class names', () => {
			const { attributes } = parseSelector('.dash-class.underscore_class');
			expect(attributes.class).toBe('dash-class underscore_class');
		});

		it('Accepts "class" as mixed expressions', () => {
			const { attributes } = parseSelector(
				'[class="attr-class"][class="attr-class2"].normal-class.another-class',
			);
			expect(attributes.class).toBe('attr-class attr-class2 normal-class another-class');
		});

		it('Attributes containing "class" is not interpreted as class', () => {
			const { attributes } = parseSelector(
				'[myclass="my"][class-ish="ish"][classy="classy"][first-class="top"]',
			);
			expect(attributes).toEqual({
				myclass: 'my',
				'class-ish': 'ish',
				classy: 'classy',
				'first-class': 'top',
			});
		});

		it('Empty "class" attributes are ignored', () => {
			const { attributeList } = parseSelector('[class]');
			expect(attributeList).toHaveLength(0);
		});
	});

	describe('Parsing a selector', () => {
		it('Parses correctly without quotes', () => {
			expect(parseSelector('[attr=value]').attributes.attr).toBe('value');
		});

		it('Parses correctly with single quotes', () => {
			expect(parseSelector("[attr='value']").attributes.attr).toBe('value');
		});

		it('Parses correctly with or double quotes', () => {
			expect(parseSelector('[attr="value"]').attributes.attr).toBe('value');
		});

		it('Parses correctly with no value attributes (native)', () => {
			expect(parseSelector('[disabled]').attributes.disabled).toBe('');
		});

		it('Parses correctly with no value attributes (custom)', () => {
			expect(parseSelector('[custom]').attributes.custom).toBe('');
		});

		it('Takes only the first value of multiple expressions of same name', () => {
			expect(parseSelector('[attr="value"][attr="value2"][attr="value3"]').attributes.attr).toBe(
				'value',
			);
		});

		describe('Correctly parses quotes in quotes', () => {
			it('Single quotes inside single quotes', () => {
				const { attributes } = parseSelector("[data-attr='should accept 'this'']");
				expect(attributes['data-attr']).toBe("should accept 'this'");
			});

			it('Single quotes inside double quotes', () => {
				const { attributes } = parseSelector('[data-attr="should accept \'this\'"]');
				expect(attributes['data-attr']).toBe("should accept 'this'");
			});

			it('Double quotes inside double quotes', () => {
				const { attributes } = parseSelector('[data-attr="should accept "this""]');
				expect(attributes['data-attr']).toBe('should accept "this"');
			});

			it('Double quotes inside single quotes', () => {
				const { attributes } = parseSelector('[data-attr=\'should accept "this"\']');
				expect(attributes['data-attr']).toBe('should accept "this"');
			});
		});

		describe('Parses custom attributes', () => {
			it.each([
				['CamelCase', 'myAttribute'],
				['With number', 'my2ndAttribute'],
				['With dash', 'my-attribute'],
				['with underscore', 'my_attribute'],
			])('%s', (_, x) => {
				const { attributes } = parseSelector(`[${x}="value = ok"]`);
				expect(attributes[x]).toBe('value = ok');
			});
		});
	});

	it('Parses full selector', () => {
		const result = parseSelector('span#id.class[data-attr="value"]');
		expect(result).toEqual({
			tagName: 'span',
			attributeList: ['data-attr', 'id', 'class'],
			attributes: {
				id: 'id',
				class: 'class',
				'data-attr': 'value',
			},
		});
	});

	it('Does not parse url attribute as class name', () => {
		const result = parseSelector('span[src="url.com"].class');
		expect(result).toEqual({
			tagName: 'span',
			attributeList: ['src', 'class'],
			attributes: {
				src: 'url.com',
				class: 'class',
			},
		});
	});

	it('Does not parse url attribute hashes as ID', () => {
		const result = parseSelector('span[src="url.com#not-id"]');
		expect(result).toEqual({
			tagName: 'span',
			attributeList: ['src'],
			attributes: {
				src: 'url.com#not-id',
			},
		});
	});
});

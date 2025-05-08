import { jest } from '@jest/globals';
import { find } from '@jsfns/web/find';
import type { SpyInstance } from 'jest-mock';

describe('"find"', () => {
	function suite(target: Document | HTMLElement) {
		it('Uses `getElementsByTagName` when selector is a tag name ', () => {
			const tagNameSpy = jest.spyOn(target, 'getElementsByTagName');

			find(target, 'div');
			expect(tagNameSpy).toHaveBeenCalledWith('div');

			tagNameSpy.mockRestore();
		});

		describe('Uses `getElementsByClassName` when selector is:', () => {
			let classSpy: SpyInstance<typeof target.getElementsByClassName>;

			beforeAll(() => {
				classSpy = jest.spyOn(target, 'getElementsByClassName');
			});

			beforeEach(() => classSpy.mockClear());

			afterAll(() => classSpy.mockRestore());

			it('Single class selector', () => {
				find(target, '.item');
				expect(classSpy).toHaveBeenCalledWith('item');
			});

			it('Multi class selector', () => {
				find(target, '.item.first');
				expect(classSpy).toHaveBeenCalledWith('item first');
			});
		});

		describe('Uses `querySelectorAll` when selector:', () => {
			let querySpy: SpyInstance<typeof target.querySelectorAll>;

			const testQuery = (query: string) => {
				querySpy.mockClear();
				find(target, query);
				expect(querySpy).toHaveBeenCalledWith(query);
			};

			beforeAll(() => {
				querySpy = jest.spyOn(target, 'querySelectorAll');
			});

			afterAll(() => querySpy.mockRestore());

			it('Contains ` ` (space)', () => testQuery('div p'));
			it('Contains `>` (child selector)', () => testQuery('div > p'));
			it('Contains `+` (next sibling selector)', () => testQuery('div + p'));
			it('Contains `~` (all next sibling selector)', () => testQuery('div ~ p'));
			it('Contains `:` (pseudo selector)', () => testQuery('div:first-child'));
			it('Contains `[` (attribute selector)', () => testQuery('div[name="test"]'));
			it('Contains `,` (multiple selectors)', () => testQuery('div, p'));

			describe('Is a mixed selector:', () => {
				it.each([
					'#MyId.item',
					'div.item',
					'div .item',
					'.item div',
					'#MyId .item div',
					'.item#MyId',
					'.item .child',
				])('%s', (selector) => {
					testQuery(selector);
				});
			});
		});
	}

	describe('With document and selector defined', () => {
		describe('Falls back to document when no element is given', () => {
			it('.getElementsByClassName', () => {
				const classSpy = jest.spyOn(document, 'getElementsByClassName');

				find('.item.first');
				expect(classSpy).toHaveBeenCalledWith('item first');

				classSpy.mockRestore();
			});

			it('.getElementsByTagName', () => {
				const tagNameSpy = jest.spyOn(document, 'getElementsByTagName');

				find('div');
				expect(tagNameSpy).toHaveBeenCalledWith('div');

				tagNameSpy.mockRestore();
			});

			it('.querySelectorAll', () => {
				const querySpy = jest.spyOn(document, 'querySelectorAll');

				find('.item div');
				expect(querySpy).toHaveBeenCalledWith('.item div');

				querySpy.mockRestore();
			});
		});

		it('Uses `getElementById` when selector is an ID', () => {
			const idSpy = jest.spyOn(document, 'getElementById');

			find(document, '#MyId');
			expect(idSpy).toHaveBeenCalledWith('MyId');

			idSpy.mockRestore();
		});

		suite(document);
	});

	describe('With element and selector defined', () => {
		it('Uses `querySelector` when element is given and selector is an ID', () => {
			const querySpy = jest.spyOn(document.body, 'querySelector');

			find(document.body, '#MyId');
			expect(querySpy).toHaveBeenCalledWith('#MyId');

			querySpy.mockRestore();
		});

		suite(document.body);
	});
});

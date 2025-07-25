import { formatCurrency } from '@jsfns/core/formatCurrency';

describe('"formatCurrency"', () => {
	const num = 1100.234;

	describe('Named export (factory)', () => {
		it.each([undefined, '', 'some string', '100,34'])(
			'Falls back to default format (euro), when thousand format is incorrect: "%s"',
			(template) => {
				expect(formatCurrency(template)(num)).toBe('1.100,23 €');
			},
		);

		it.each([
			['$ 1,000.00', '$ 1,100.23'],
			['~1|000=00', '~1|100=23'],
			['1000.000', '1100.234'],
			['1000000', '1100234'],
		])('Format number to a specified format, "%s"', (template, output) => {
			expect(formatCurrency(template)(num)).toBe(output);
		});
	});
});

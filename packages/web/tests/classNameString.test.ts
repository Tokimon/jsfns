import { classNameString } from '@jsfns/web/classNameString';

describe('"classNameString"', () => {
	it('Return a given string directly', () => {
		expect(classNameString('class')).toBe('class');
	});

	it('Combines all given strings', () => {
		expect(classNameString('class1', 'class2')).toBe('class1 class2');
	});

	it('Combines string in a given array', () => {
		expect(classNameString(['class1', 'class2'])).toBe('class1 class2');
	});

	it('Combines class names according to a given object', () => {
		expect(classNameString({ class1: true, class2: false, class3: true })).toBe('class1 class3');
	});

	it('Combines class names from a combination of inputs', () => {
		const result = classNameString('class', { class1: true, class2: false, class3: true }, [
			'class12',
			{ class13: true, class14: false },
		]);
		expect(result).toBe('class class1 class3 class12 class13');
	});

	it('Ignores empty values', () => {
		const result = classNameString('', {}, ['', []]);
		expect(result).toBe('');
	});
});

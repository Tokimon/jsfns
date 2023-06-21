import { formatNumber } from '@js-fns/core/formatNumber';

describe('"formatNumber"', () => {
  const num = 1100.254;
  it('Formats number with default settings', () => {
    expect(formatNumber(num)).toBe('1.100,25');
  });

  it.each([
    [{ thousand: '|' }, '1|100,25'],
    [{ decimal: '|' }, '1.100|25'],
    [{ decimalCount: 1 }, '1.100,3'],
    [{ decimalCount: '>4' }, '1.100,2540'],
    [{ decimalCount: '<2' }, '1.100,25'],
    [{ thousand: '-', decimal: '#' }, '1-100#25'],
    [{ thousand: '', decimalCount: 3 }, '1100,254'],
    [{ decimal: '-', decimalCount: '>2' }, '1.100-254'],
    [{ thousand: '.', decimal: ',', decimalCount: 3 }, '1.100,254'],
  ])('Formats number with given separator configuration: %s', (config, output) => {
    expect(formatNumber(num, config)).toBe(output);
  });
});

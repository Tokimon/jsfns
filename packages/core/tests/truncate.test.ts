import truncate from '@js-fns/core/truncate';

describe('"truncate"', () => {
  describe('Returns the given entry as is, when "maxLength" is', () => {
    it('Not given', () => {
      const str = 'This is not truncated';
      expect(truncate(str)).toBe(str);
    });

    it('Grater than the length of the entry', () => {
      const str = 'Short string';
      expect(truncate(str, { maxLength: 20 })).toBe(str);
    });
  });

  describe('Truncates the given entry and adds a given end to it', () => {
    it('Adds default end ("...")', () => {
      expect(truncate('Truncated string', { maxLength: 10 })).toBe('Truncated ...');
    });

    it.each(['???', '_'])('Adds custom end: "%s"', (end) => {
      expect(truncate('Truncated string', { maxLength: 10, end })).toBe('Truncated ' + end);
    });
  });
});

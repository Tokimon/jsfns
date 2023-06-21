import { ensureHTML } from '@js-fns/web/ensureHTML';

describe('"ensureHTML"', () => {
  it('Returns string containing "<" directly', () => {
    expect(ensureHTML('<')).toBe('<');
  });

  it('Returns generated HTML from a selector', () => {
    expect(ensureHTML('#id.class[name=test]')).toBe('<div id="id" name="test" class="class"></div>');
  });
});

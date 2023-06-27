import { ensureHTML } from '@jsfns/web/ensureHTML';

describe('"ensureHTML"', () => {
  it('Returns string containing "<" directly', () => {
    expect(ensureHTML('<')).toBe('<');
  });

  it('Returns generated HTML from a selector', () => {
    expect(ensureHTML('#id.class[name=test]')).toBe('<div name="test" id="id" class="class"></div>');
  });
});

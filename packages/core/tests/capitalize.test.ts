import { capitalize } from '@jsfns/core/capitalize';

describe('"capitalize"', () => {
  it.each([
    ['normal string', 'Normal String'],
    ['with-dash', 'With-Dash'],
    ['with_underscore', 'With_underscore'],
    ['with ABBR', 'With ABBR'],
    ['Already some Capitalized words', 'Already Some Capitalized Words'],
  ])('Returns string capitalized: "%s"', (input, output) => {
    expect(capitalize(input)).toBe(output);
  });
});

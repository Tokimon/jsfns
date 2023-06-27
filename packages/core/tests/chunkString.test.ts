import { chunkString } from '@jsfns/core/chunkString';

describe('"chunkString"', () => {
  it('Cuts up a string into chunks', () => {
    const chunks = chunkString('abcdef');
    expect(chunks).toEqual(['ab', 'cd', 'ef']);
  });

  it('Cuts up a string into chunks with given length', () => {
    const chunks = chunkString('abcdefghijkl', 4);
    expect(chunks).toEqual(['abcd', 'efgh', 'ijkl']);
  });

  it('When the given chunk length is grater than the string length, only one entry will be returned containing the entire string', () => {
    const chunks = chunkString('abcdef', 7);
    expect(chunks).toEqual(['abcdef']);
  });

  it('When string length is not divisible by the chunk length, last entry will contain the remaining of the string', () => {
    const chunks = chunkString('abcdefghijlkmn', 3);
    expect(chunks).toEqual(['abc', 'def', 'ghi', 'jlk', 'mn']);
  });

  it('Returns empty Array for empty values', () => {
    expect(chunkString('')).toHaveLength(0);
  });
});

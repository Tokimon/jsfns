import { type VendorPrefixing, vendorPrefixed } from '@jsfns/web/vendorPrefixed';

const resultArray = (js: string, css: string): VendorPrefixing => [
  { prefix: '', js, css },
  { prefix: 'webkit', js: `webkit${js}`, css: `-webkit-${css}` },
  { prefix: 'moz', js: `moz${js}`, css: `-moz-${css}` },
  { prefix: 'ms', js: `ms${js}`, css: `-ms-${css}` },
  { prefix: 'o', js: `o${js}`, css: `-o-${css}` },
];

describe('"vendorPrefixed"', () => {
  it('Prefixes a word with vendor prefixes', () => {
    expect(vendorPrefixed('vendorPrefixed')).toEqual(resultArray('VendorPrefixed', 'vendor-prefixed'));
  });

  it('Prefixes a phrase with vendor prefixes and converts it into PascalCased word', () => {
    expect(vendorPrefixed('prefix this phrase')).toEqual(resultArray('PrefixThisPhrase', 'prefix-this-phrase'));
  });
});

import classNames from '~web/classNames';



describe('"classNames"', () => {
  it('Return a given string directly', () => {
    expect(classNames('class')).toBe('class');
  });

  it('Combines all given strings', () => {
    expect(classNames('class1', 'class2')).toBe('class1 class2');
  });

  it('Combines string in a given array', () => {
    expect(classNames(['class1', 'class2'])).toBe('class1 class2');
  });

  it('Combines class names according to a given object', () => {
    expect(classNames({ class1: true, class2: false, class3: true })).toBe('class1 class3');
  });

  it('Combines class names from a mixture of inputs', () => {
    expect(classNames(
      'class',
      { class1: true, class2: false, class3: true },
      ['class12', { class13: true, class14: false }]
    )).toBe('class class1 class3 class12 class13');
  });
});

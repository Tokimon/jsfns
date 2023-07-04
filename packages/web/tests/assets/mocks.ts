import { jest } from '@jest/globals';

type Overrides = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export function mockClientRect(overrides?: Overrides): () => void {
  const spy = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
    Object.assign(
      {
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: () => undefined,
      },
      overrides
    )
  );

  return () => spy.mockRestore();
}

export function mockOffsetParent(htmlElmProto: HTMLElement) {
  return jest.spyOn(htmlElmProto, 'offsetParent', 'get').mockImplementation(function (this: HTMLElement) {
    if (this.tagName === 'BODY' || this.style.position === 'fixed') return null;

    let parent = this.parentElement;

    while (parent) {
      const { overflow, position } = window.getComputedStyle(parent);

      if (overflow == 'auto' || overflow === 'scroll' || position === 'relative' || parent.tagName === 'BODY') break;

      parent = parent.parentElement;
    }

    return parent;
  });
}

const parsePosition = (elm: HTMLElement, dir: 'Top' | 'Left') => {
  if (elm.style.position === 'absolute' || elm.style.position === 'fixed') {
    return parseInt(elm.style[dir.toLowerCase() as 'top' | 'left']) || 0;
  } else if (elm.parentElement) {
    return parseInt(window.getComputedStyle(elm.parentElement)[('padding' + dir) as 'paddingTop' | 'paddingLeft']) || 0;
  }

  return 0;
};

export function mockOffsetPosition(htmlElmProto: HTMLElement) {
  const spyTop = jest.spyOn(htmlElmProto, 'offsetTop', 'get').mockImplementation(function (this: HTMLElement) {
    return parsePosition(this, 'Top');
  });

  const spyLeft = jest.spyOn(htmlElmProto, 'offsetLeft', 'get').mockImplementation(function (this: HTMLElement) {
    return parsePosition(this, 'Left');
  });

  return () => {
    spyTop.mockRestore();
    spyLeft.mockRestore();
  };
}

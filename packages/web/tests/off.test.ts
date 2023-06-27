import { jest } from '@jest/globals';
import { off } from '@jsfns/web/off';
import type { SpyInstance } from 'jest-mock';
import { bind, triggerEvent } from './assets/helpers';

describe('"off"', () => {
  function suite(elm?: HTMLElement | Window) {
    let removeEventListenerSpy: SpyInstance<typeof document.removeEventListener>;
    const cb = jest.fn();

    const eventName = 'test';
    const eventNames = [1, 2, 3].map((n) => eventName + n.toString());

    const _off = (...args: [string | string[], EventListenerOrEventListenerObject, EventListenerOptions?]) =>
      elm ? off(elm, ...args) : off(...args);

    const target = elm || document;

    beforeAll(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "removeEventListener"
      removeEventListenerSpy = jest.spyOn(elm || document, 'removeEventListener');
    });

    beforeEach(() => {
      removeEventListenerSpy.mockClear();
      cb.mockClear();
    });

    afterAll(() => removeEventListenerSpy.mockRestore());

    it.each(['', '_', '-', '.', ':'])('Removes event with separator: "%s"', (separator) => {
      let e = eventName;
      if (separator) e += separator + 'part';

      _off(e, cb);

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    });

    it('Calls "removeEventListener" for each event name in a list', () => {
      _off(eventNames, cb);

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
      const eventArguments = removeEventListenerSpy.mock.calls.map(([name]) => name);
      expect(eventNames).toEqual(eventArguments);
    });

    it('Removes event', () => {
      bind(target, eventName, cb);
      triggerEvent(eventName, target);

      expect(cb).toHaveBeenCalledTimes(1);

      _off(eventName, cb);

      triggerEvent(eventName, target);

      expect(cb).toHaveBeenCalledTimes(1);
    });
  }

  describe.each([
    ['no Element (falls back to Document)', undefined],
    ['a HTML element', document.body],
    ['Window', window],
  ])('With %s', (_, elm) => {
    suite(elm);
  });
});

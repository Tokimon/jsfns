import { jest } from '@jest/globals';
import type { SpyInstance } from 'jest-mock';
import on, { type argsWithoutTarget } from '~web/on';
import { unbind } from './assets/helpers';



describe('"on"', () => {
  function suite(elm?: HTMLElement | Window) {
    let addEventListenerSpy: SpyInstance<typeof document.addEventListener>;
    const cb = jest.fn();

    const eventName = 'test';
    const eventNames = [1, 2, 3].map((n) => eventName + n);

    const _on = (...args: argsWithoutTarget) => elm ? on(elm, ...args) : on(...args);

    const target = elm || document;

    beforeAll(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      addEventListenerSpy = jest.spyOn(target, 'addEventListener');
    });

    beforeEach(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      addEventListenerSpy.mockClear();
      cb.mockClear();
    });

    afterAll(() => addEventListenerSpy.mockRestore());

    it.each(
      ['', '_', '-', '.', ':']
    )('Adds event with separator: "%s"', (separator) => {
      let e = eventName;
      if (separator) { e += separator + 'part'; }

      const off = _on(e, cb);

      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

      off();
    });

    it('Calls "addEventListener" for each event name in a list', () => {
      const off = _on(eventNames, cb);

      expect(addEventListenerSpy).toHaveBeenCalledTimes(3);

      off();
    });
  }

  describe('With no Element given (falls back to Document)', () => {
    suite();
  });

  describe('With a given HTML element', () => {
    suite(document.body);
  });

  describe('With Window', () => {
    suite(window);
  });
});

import { jest } from '@jest/globals';
import type { SpyInstance } from 'jest-mock';
import eventOptionsSupported from '~web/eventOptionsSupported';
import off from '~web/off';
import { bind, triggerEvent } from './assets/helpers';

describe('"off"', () => {
  function suite(elm?: HTMLElement | Window) {
    let removeEventListenerSpy: SpyInstance<typeof document.removeEventListener>;
    const cb = jest.fn();

    const eventName = 'test';
    const eventNames = [1, 2, 3].map((n) => eventName + n);

    const _off = (...args: [string | string[], EventListenerOrEventListenerObject, EventListenerOptions?]) =>
      elm ? off(elm, ...args) : off(...args);

    const target = elm || document;

    beforeAll(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      eventOptionsSupported();
      removeEventListenerSpy = jest.spyOn(elm || document, 'removeEventListener');
    });

    beforeEach(() => {
      removeEventListenerSpy.mockClear();
      cb.mockClear();
    });

    afterAll(() => removeEventListenerSpy.mockRestore());

    it.each(['', '_', '-', '.', ':'])('Removes event with separator: "%s"', (separator) => {
      let e = eventName;
      if (separator) {
        e += separator + 'part';
      }

      _off(e, cb);

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    });

    it('Calls "removeEventListener" for each event name in a list', () => {
      _off(eventNames, cb);

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
    });

    it('Removes event', () => {
      bind(target, eventName, cb);
      triggerEvent(eventName, target);

      expect(cb).toHaveBeenCalledTimes(1);

      _off(eventName, cb);

      triggerEvent(eventName, target);

      expect(cb).toHaveBeenCalledTimes(1);
    });

    describe('When EventTarget is not supported, third argument in "removeEventListener" is', () => {
      beforeEach(() => {
        const supportSpy = jest.spyOn(document, 'addEventListener').mockImplementation(() => {
          throw new Error('nope');
        });

        const supported = eventOptionsSupported(true);
        expect(supported).toBe(false);

        supportSpy.mockRestore();
      });

      afterEach(() => {
        eventOptionsSupported(true);
      });

      it('`false` when no options are given', () => {
        _off(eventName, cb);

        expect(removeEventListenerSpy).toHaveBeenCalledWith(eventName, cb, false);
      });

      it('`false` when "capture" is falsy', () => {
        _off(eventName, cb, { capture: false });

        expect(removeEventListenerSpy).toHaveBeenCalledWith(eventName, cb, false);
      });

      it('`true` when "capture" is true', () => {
        _off(eventName, cb, { capture: true });

        expect(removeEventListenerSpy).toHaveBeenCalledWith(eventName, cb, true);
      });
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

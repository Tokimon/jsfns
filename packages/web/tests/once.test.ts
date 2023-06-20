import { jest } from '@jest/globals';
import type { SpyInstance } from 'jest-mock';
import eventOptionsSupported from '~web/eventOptionsSupported';
import type { OnceEventListenerOptions, WhenFunction } from '~web/once';
import once from '~web/once';
import { triggerEvent } from './assets/helpers';

describe('"once"', () => {
  function suite(elm?: HTMLElement | Window) {
    const cb = jest.fn();

    const eventName = 'test';
    const eventNames = [1, 2, 3].map((n) => eventName + n);

    const _once = (...args: [string | string[], EventListenerOrEventListenerObject, OnceEventListenerOptions?]): ReturnType<typeof once> =>
      elm ? once(elm, ...args) : once(...args);

    const target = elm || document;

    beforeAll(() => {
      cb.mockReset();
    });

    beforeEach(() => {
      cb.mockReset();
    });

    it('Returns a function that unbinds the event handler', () => {
      const unbind = _once(eventName, cb);
      unbind();

      triggerEvent(eventName);

      expect(cb).toHaveBeenCalledTimes(0);
    });

    describe('Binds event with "addEventListener"', () => {
      let addEventListenerSpy: SpyInstance<typeof document.addEventListener>;

      beforeAll(() => {
        addEventListenerSpy = jest.spyOn(target, 'addEventListener');
      });

      beforeEach(() => {
        // we need to do the check to get the right number of calls,
        // since the check uses "addEventListener"
        eventOptionsSupported();
        addEventListenerSpy.mockClear();
      });

      afterAll(() => addEventListenerSpy.mockRestore());

      it.each(['', '_', '-', '.', ':'])('with separator: "%s"', (separator) => {
        let e = eventName;
        if (separator) {
          e += separator + 'part';
        }

        const unbind = _once(e, cb);

        expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

        unbind();
      });

      it('For each event name in a list', () => {
        const unbind = _once(eventNames, cb);

        expect(addEventListenerSpy).toHaveBeenCalledTimes(3);

        unbind();
      });

      describe('When EventTarget is not supported, third argument in "addEventListener" is', () => {
        const anyFunc = expect.any(Function);

        beforeEach(() => {
          const supportSpy = jest.spyOn(document, 'addEventListener').mockImplementation(() => {
            throw new Error('nope');
          });

          const supported = eventOptionsSupported(true);
          expect(supported).toBe(false);

          // Since we are re-mocking the "document.addEventListener" above,
          // we only "reset" when the target is the document, instead of restoring
          target === document ? supportSpy.mockReset() : supportSpy.mockRestore();
        });

        afterEach(() => {
          eventOptionsSupported(true);
        });

        it('`false` when no options are given', () => {
          const unbind = _once(eventName, cb);

          expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, anyFunc, false);

          unbind();
        });

        it.each([undefined, false])('`false` when "capture" is: %s', (capture) => {
          const unbind = _once(eventName, cb, { capture });

          expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, anyFunc, false);

          unbind();
        });

        it('`true` when "capture" is true', () => {
          const unbind = _once(eventName, cb, { capture: true });

          expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, anyFunc, true);

          unbind();
        });
      });
    });

    describe('Triggers event only once', () => {
      it('Trigger given event only once', () => {
        const unbind = _once(eventName, cb);

        triggerEvent(eventName, target);
        triggerEvent(eventName, target);

        expect(cb).toHaveBeenCalledTimes(1);

        unbind();
      });

      it('Trigger given event the first time the "when" option is fulfilled', () => {
        const when = jest.fn<WhenFunction>().mockReturnValue(true).mockReturnValueOnce(false);

        const unbind = _once(eventName, cb, { when });

        triggerEvent(eventName, target);
        expect(cb).toHaveBeenCalledTimes(0);
        expect(when).toHaveBeenCalledTimes(1);

        triggerEvent(eventName, target);
        expect(cb).toHaveBeenCalledTimes(1);
        expect(when).toHaveBeenCalledTimes(2);

        triggerEvent(eventName, target);
        expect(cb).toHaveBeenCalledTimes(1);
        expect(when).toHaveBeenCalledTimes(2);

        unbind();
      });

      it('Multiple events handlers are triggered only once', () => {
        const unbind = _once(eventNames, cb);

        eventNames.forEach((e) => triggerEvent(e, target));

        expect(cb).toHaveBeenCalledTimes(3);
        cb.mockClear();

        eventNames.forEach((e) => triggerEvent(e, target));

        expect(cb).toHaveBeenCalledTimes(0);

        unbind();
      });
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

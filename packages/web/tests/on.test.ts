import { jest } from '@jest/globals';
import eventOptionsSupported from '~web/eventOptionsSupported';
import on from '~web/on';
import { unbind } from './assets/helpers';
import type { SpyReturnType } from './assets/mocks';



describe('"on"', () => {
  function suite(elm?: HTMLElement | Window) {
    let addEventListenerSpy: SpyReturnType<typeof document.addEventListener>;
    const cb = jest.fn();

    const eventName = 'test';
    const eventNames = [1, 2, 3].map((n) => eventName + n);

    const _on = (...args: [
      string | string[],
      EventListenerOrEventListenerObject,
      EventListenerOptions?
    ]) => elm ? on(elm, ...args) : on(...args);

    const target = elm || document;

    beforeAll(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      eventOptionsSupported();
      addEventListenerSpy = jest.spyOn(target, 'addEventListener');
    });

    beforeEach(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      eventOptionsSupported();
      addEventListenerSpy.mockClear();
      cb.mockClear();
    });

    afterAll(() => addEventListenerSpy.mockRestore());

    it.each(
      ['', '_', '-', '.', ':']
    )('Adds event with separator: "%s"', (separator) => {
      let e = eventName;
      if (separator) { e += separator + 'part'; }

      _on(e, cb);

      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

      unbind(target, e, cb);
    });

    it('Calls "addEventListener" for each event name in a list', () => {
      _on(eventNames, cb);

      expect(addEventListenerSpy).toHaveBeenCalledTimes(3);

      eventNames.forEach((e) => unbind(target, e, cb));
    });

    describe('When EventTarget is not supported, third argument in "addEventListener" is', () => {
      beforeEach(() => {
        const supportSpy = jest.spyOn(document, 'addEventListener')
          .mockImplementation(() => { throw new Error('nope'); });

        const supported = eventOptionsSupported(true);
        expect(supported).toBe(false);

        // Since we are re-mocking the "document.addEventListener" above,
        // we only "reset" when the target is the document, instead of restoring
        target === document
          ? supportSpy.mockReset()
          : supportSpy.mockRestore();
      });

      afterEach(() => { eventOptionsSupported(true); });

      it('`false` when no options are given', () => {
        _on(eventName, cb);

        expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, cb, false);

        unbind(target, eventName, cb);
      });

      it('`false` when "capture" is falsy', () => {
        _on(eventName, cb, { capture: false });

        expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, cb, false);

        unbind(target, eventName, cb);
      });

      it('`true` when "capture" is true', () => {
        _on(eventName, cb, { capture: true });

        expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, cb, true);

        unbind(target, eventName, cb);
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

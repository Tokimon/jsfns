import { jest } from '@jest/globals';
import type { SpyInstance } from 'jest-mock';
import { type OnOptions, on } from '@js-fns/web/on';
import { byId, insertHtml, triggerEvent } from './assets/helpers';

const testID = 'onEvents';
const eventName = 'test';
const eventNames = [1, 2, 3].map((n) => eventName + n.toString());

describe('"on"', () => {
  function suite(elm: Document | HTMLElement | Window) {
    let addEventListenerSpy: SpyInstance<typeof document.addEventListener>;
    let targetElm: HTMLElement;
    let targetChild: HTMLElement;

    const cb = jest.fn();
    const when = jest.fn();

    beforeAll(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      addEventListenerSpy = jest.spyOn(elm, 'addEventListener');

      insertHtml(`
        <div id='${testID}'>
          <span class='child'></span>
        </div>
      `);

      targetElm = byId(testID);
      targetChild = targetElm.firstElementChild as HTMLElement;
    });

    beforeEach(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      addEventListenerSpy.mockClear();
      cb.mockClear();
      when.mockReturnValue(false);
    });

    afterAll(() => addEventListenerSpy.mockRestore());

    it.each(['', '_', '-', '.', ':'])('Adds event with separator: "%s"', (separator) => {
      let e = eventName;
      if (separator) e += separator + 'part';

      const off = on(elm, e, cb);

      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

      off();
    });

    it('Calls "addEventListener" for each event name in a list', () => {
      const off = on(elm, eventNames, cb);

      expect(addEventListenerSpy).toHaveBeenCalledTimes(eventNames.length);
      const eventArguments = addEventListenerSpy.mock.calls.map(([name]) => name);
      expect(eventNames).toEqual(eventArguments);

      off();
    });

    describe('Options', () => {
      it('{ when } - Only triggers event when the "when" method return "true"', () => {
        when.mockReturnValue(false);

        const off = on(elm, eventName, cb, { when: when as OnOptions['when'] });

        triggerEvent(eventName, elm);
        triggerEvent(eventName, elm);
        when.mockReturnValue(true);
        triggerEvent(eventName, elm);
        when.mockReturnValue(false);
        triggerEvent(eventName, elm);
        triggerEvent(eventName, elm);

        expect(cb).toHaveBeenCalledTimes(1);

        off();
      });

      it('{ once } - Triggers the event only once', () => {
        const off = on(elm, eventName, cb, { once: true });

        triggerEvent(eventName, elm);
        triggerEvent(eventName, elm);
        triggerEvent(eventName, elm);

        expect(cb).toHaveBeenCalledTimes(1);

        off();
      });

      it('{ delegate } - Triggers the event on the target that matches the given selector', () => {
        const off = on(elm, eventName, cb, { delegate: '#' + targetElm.id });

        triggerEvent(eventName, elm);

        expect(cb).toHaveBeenCalledTimes(0);

        triggerEvent(eventName, targetElm);
        triggerEvent(eventName, targetChild);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const expectedObj = expect.objectContaining({ currentTarget: targetElm });

        expect(cb).toHaveBeenCalledTimes(2);
        expect(cb).toHaveBeenNthCalledWith(1, expectedObj);
        expect(cb).toHaveBeenNthCalledWith(2, expectedObj);

        off();
      });

      it('{ when, once } - Triggers event only once when the "when" method return "true"', () => {
        when.mockReturnValue(false);

        const off = on(elm, eventName, cb, {
          when: when as OnOptions['when'],
          once: true,
        });

        triggerEvent(eventName, elm);
        triggerEvent(eventName, elm);
        when.mockReturnValue(true);
        triggerEvent(eventName, elm); // <-- should be removed after this call
        triggerEvent(eventName, elm);
        triggerEvent(eventName, elm);

        expect(cb).toHaveBeenCalledTimes(1);

        off();
      });

      it('{ when, delegate } - Triggers event on the matching target, only when the "when" method return "true"', () => {
        when.mockReturnValue(false);

        const off = on(elm, eventName, cb, {
          delegate: '#' + targetElm.id,
          when: when as OnOptions['when'],
        });

        triggerEvent(eventName, targetChild);
        triggerEvent(eventName, targetChild);
        when.mockReturnValue(true);
        triggerEvent(eventName, targetChild);
        when.mockReturnValue(false);
        triggerEvent(eventName, targetChild);
        triggerEvent(eventName, targetChild);

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: targetElm }));

        off();
      });

      it('{ once, delegate } - Triggers event on the matching target, only once', () => {
        const off = on(elm, eventName, cb, {
          delegate: '#' + targetElm.id,
          once: true,
        });

        triggerEvent(eventName, elm);

        expect(cb).toHaveBeenCalledTimes(0);

        triggerEvent(eventName, targetChild);
        triggerEvent(eventName, targetChild);

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: targetElm }));

        off();
      });

      it('{ when, once, delegate } - Triggers event on the matching target, only once when the "when" method return "true"', () => {
        const off = on(elm, eventName, cb, {
          delegate: '#' + targetElm.id,
          when: when as OnOptions['when'],
          once: true,
        });

        when.mockReturnValue(false);
        triggerEvent(eventName, elm);

        expect(cb).toHaveBeenCalledTimes(0);

        when.mockReturnValue(true);
        triggerEvent(eventName, elm);

        expect(cb).toHaveBeenCalledTimes(0);

        when.mockReturnValue(false);
        triggerEvent(eventName, targetElm);

        expect(cb).toHaveBeenCalledTimes(0);

        when.mockReturnValue(true);

        triggerEvent(eventName, targetElm);
        triggerEvent(eventName, targetChild);
        triggerEvent(eventName, targetChild);

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: targetElm }));

        off();
      });

      it('{ when, once, delegate } - For multiple events', () => {
        const whens: Record<string, [boolean, EventListener]> = {
          [eventNames[0]]: [true, jest.fn()],
          [eventNames[1]]: [true, jest.fn()],
          [eventNames[2]]: [true, jest.fn()],
        };

        const multiWhen: OnOptions['when'] = (e) => whens[e.type][0];

        const off = on(elm, eventNames, (e) => whens[e.type][1](e), {
          delegate: '#' + targetElm.id,
          when: multiWhen,
          once: true,
        });

        eventNames.forEach((evt) => {
          triggerEvent(evt, elm);
          expect(whens[evt][1]).toHaveBeenCalledTimes(0);
        });

        eventNames.forEach((evt) => {
          whens[evt][0] = false;
          triggerEvent(evt, targetElm);
          expect(whens[evt][1]).toHaveBeenCalledTimes(0);
        });

        whens[eventNames[0]][0] = true;
        triggerEvent(eventNames[0], targetElm);
        triggerEvent(eventNames[0], targetChild);

        expect(whens[eventNames[0]][1]).toHaveBeenCalledTimes(1);
        expect(whens[eventNames[1]][1]).toHaveBeenCalledTimes(0);
        expect(whens[eventNames[2]][1]).toHaveBeenCalledTimes(0);

        whens[eventNames[1]][0] = true;
        triggerEvent(eventNames[1], targetElm);
        triggerEvent(eventNames[1], targetChild);

        expect(whens[eventNames[0]][1]).toHaveBeenCalledTimes(1);
        expect(whens[eventNames[1]][1]).toHaveBeenCalledTimes(1);
        expect(whens[eventNames[2]][1]).toHaveBeenCalledTimes(0);

        whens[eventNames[2]][0] = true;
        triggerEvent(eventNames[2], targetElm);
        triggerEvent(eventNames[2], targetChild);

        expect(whens[eventNames[0]][1]).toHaveBeenCalledTimes(1);
        expect(whens[eventNames[1]][1]).toHaveBeenCalledTimes(1);
        expect(whens[eventNames[2]][1]).toHaveBeenCalledTimes(1);

        off();
      });
    });
  }

  describe('With document given', () => {
    it('Falls back to document, when no element is given', () => {
      const spy = jest.spyOn(document, 'addEventListener');
      const off = on(eventNames, jest.fn());

      expect(spy).toHaveBeenCalledTimes(eventNames.length);

      off();
    });

    suite(document);
  });

  describe('With a given HTML element', () => {
    suite(document.body);
  });

  describe('With Window', () => {
    suite(window);
  });
});

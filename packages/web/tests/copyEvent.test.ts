import { copyEvent } from '@jsfns/web/copyEvent';
import { createElement, triggerEvent } from './assets/helpers';

describe('"copyEvent"', () => {
  type Assertion = (event: Event) => void;
  const testEvent = (assertion: Assertion) => {
    return new Promise<void>((resolve) => {
      const handler: EventListener = (event) => {
        assertion(event);
        resolve();
      };

      document.addEventListener('click', handler);

      triggerEvent('click');
      document.removeEventListener('click', handler);
    });
  };

  it('Copies given event', () => {
    const event = new Event('click');
    const copy = copyEvent(event);

    expect(copy).not.toBe(event);
    expect(copy.type).toBe(event.type);
  });

  it('Copies event from triggered event', () => {
    return testEvent((event) => {
      const copy = copyEvent(event);
      expect(copy).not.toBe(event);
      expect(copy.type).toBe(event.type);
    });
  });

  it('Set isTrusted to "false"', () => {
    return testEvent((event) => {
      expect(copyEvent(event).isTrusted).toBe(false);
    });
  });

  it('Correctly copies currentTarget', () => {
    return testEvent((event) => {
      const copy = copyEvent(event);
      expect(copy.currentTarget).toBe(event.currentTarget);
    });
  });

  it('Correctly overrides currentTarget', () => {
    return testEvent((event) => {
      const div = createElement('div');
      const copy = copyEvent(event, div);
      expect(copy.currentTarget).toBe(div);
    });
  });

  // TODO: ideally test all variations of events
});

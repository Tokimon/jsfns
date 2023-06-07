import { jest } from '@jest/globals';
import type { SpyInstance } from 'jest-mock';
import eventOptionsSupported from '~web/eventOptionsSupported';



describe('"eventOptionsSupported"', () => {
  let addEventListenerSpy: SpyInstance<typeof document.addEventListener>;

  beforeAll(() => {
    addEventListenerSpy = jest.spyOn(document, 'addEventListener');
  });

  beforeEach(() => addEventListenerSpy.mockReset());

  afterAll(() => addEventListenerSpy.mockRestore());

  it('Memoizes the result', () => {
    eventOptionsSupported(true);
    eventOptionsSupported();

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
  });

  it('Calling with recheck = true, bypasses the memoization', () => {
    const spy = jest.fn();
    addEventListenerSpy.mockImplementation(spy);

    eventOptionsSupported(true);
    eventOptionsSupported(true);

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  it('Returns `false` when options are ignored when calling `addEventListener`', () => {
    addEventListenerSpy.mockImplementation(() => undefined);

    expect(eventOptionsSupported(true)).toBe(false);
  });

  it('Returns `false` when calling `addEventListener` with options, throws an error', () => {
    addEventListenerSpy.mockImplementation(() => { throw new Error('ups'); });

    expect(eventOptionsSupported(true)).toBe(false);
  });

  it('Returns `true` when options are supported', () => {
    const cb = (
      evt: string,
      handler: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passive } = options as AddEventListenerOptions;
    };

    addEventListenerSpy.mockImplementation(cb);

    expect(eventOptionsSupported(true)).toBe(true);
  });
});

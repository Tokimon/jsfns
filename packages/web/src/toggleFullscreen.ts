/**
 * Toggles fullscreen mode on off for a given element (defaults to the <html> element)
 *
 * @param elm - DOM element to put into fullscreen mode
 * @param options - Options to pass to `requestFullscreen`
 * @returns Promise
 *
 * @example
 *
 * ```ts
 * toggleFullscreen();
 * toggleFullscreen(MyElm);
 * toggleFullscreen(MyElm, { navigationUI: 'show' });
 * ```
 */
export async function toggleFullscreen(elm: Element = document.documentElement, options?: FullscreenOptions) {
  const { fullscreenElement } = document;
  const isFullscreenElement = elm === fullscreenElement;

  if (fullscreenElement && !isFullscreenElement) await document.exitFullscreen();

  return !fullscreenElement && !isFullscreenElement ? elm.requestFullscreen(options) : document.exitFullscreen();
}

export default toggleFullscreen;

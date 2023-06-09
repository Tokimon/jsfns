export default async (elm: Element = document.documentElement, options?: FullscreenOptions) => {
  const { fullscreenElement } = document;
  const isFullscreenElement = elm === fullscreenElement;

  if (fullscreenElement && !isFullscreenElement) {
    await document.exitFullscreen();
  }

  return !fullscreenElement && !isFullscreenElement
    ? elm.requestFullscreen(options)
    : document.exitFullscreen();
};

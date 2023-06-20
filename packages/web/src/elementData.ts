let _cache = new WeakMap();

/** Resets ALL local data cache  */
export const resetCache = () => {
  _cache = new WeakMap();
};

/**
 * Inspired by jQuery's data method that stores data in memory associated with a given element.
 * If no data is given, the stored data for the given key is returned. If no key is given either
 * the entire data object will be returned.
 *
 * @param elm - Element to link the data to
 * @param key - Data key
 * @param data - Data to store
 * @returns The entire cache or the data for the given key
 *
 * @remark
 * Data is stored in a WeakMap, so when an element is deleted, the associated data is deleted as well.
 *
 * @example
 *
 * ```ts
 * elementData(MyElm, 'entry', { count: 10 }) // --> { count: 10 }
 * elementData(MyElm, 'entry') // --> <What ever was stored under "entry">
 * elementData(MyElm) // --> everything was stored for the given element
 * ```
 */
export function elementData(elm: Node, key?: string, data?: unknown) {
  let elmCache = _cache.get(elm);

  if (!key) {
    return elmCache;
  }

  if (data !== undefined) {
    if (!elmCache) {
      elmCache = {};
      _cache.set(elm, elmCache);
    }

    elmCache[key] = data;
  }

  return elmCache?.[key];
}

export default elementData;

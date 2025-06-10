let _cache = new WeakMap<Node, Record<string, unknown | undefined>>();

/**
 * Resets ALL local data cache
 */
export function resetCache() {
  _cache = new WeakMap();
}

/**
 * Inspired by jQuery's data method that stores data in memory associated with a given element.
 * - `data` = `undefined`: Return the stored data for the given key
 * - `data` = `null`: Remove the stored data for the given key
 * - `key` = `undefined`: return the entire data object
 *
 * @param elm - Element to link the data to
 * @param key - Data key
 * @param data - Data to store
 * @returns The entire cache or the data for the given key
 *
 * @remarks
 * Data is stored in a WeakMap, so when an element is deleted, the associated data is deleted as well.
 *
 * @example
 *
 * ```ts
 * elementData(MyElm, 'entry', { count: 10 }) // --> { count: 10 }
 * elementData(MyElm, 'entry') // --> <What ever was stored under "entry">
 * elementData(MyElm, 'entry', null) // --> delete the "entry" entry
 * elementData(MyElm) // --> everything was stored for the given element
 * ```
 */
export function elementData(elm: Node, key?: string, data?: unknown) {
  let elmCache = _cache.get(elm);

  if (!key) return elmCache;

  if (data !== undefined) {
    if (!elmCache && data != null) {
      elmCache = {};
      _cache.set(elm, elmCache);
    }

    if (!elmCache) return;

    if (data === null) {
      delete elmCache[key];
    } else {
      elmCache[key] = data;
    }
  }

  return elmCache?.[key];
}

export default elementData;

const byId = (id: string) => document.getElementById(id);



/**
 * Find a DOM element with the given ID
 *
 * @param ids - ID to find the element by
 * @returns The found element
 *
 * @example
 *
 * ```ts
 * findById('my-id') // --> "#my-id" element
 * findById('non-existing') // --> null
 * ```
 */
 function findById(ids: string): HTMLElement | null

/**
 * Find a DOM elements from a list of IDs
 *
 * @param ids - ID to find the element by
 * @returns The found elements
 *
 * @example
 *
 * ```ts
 * findById(['my-id', 'my-other-id']) // --> "#my-id" and "#my-other-elm" elements
 * findById(['non-existing', 'non-existing-2']) // --> []
 * ```
 */
function findById(ids: string[]): HTMLElement[]

function findById(ids: string | string[]): HTMLElement | HTMLElement[] | null {
  if (!Array.isArray(ids)) return byId(ids);

  return ids.reduce((nodes, id) => {
    const node = byId(id);
    node && nodes.push(node);
    return nodes;
  }, [] as HTMLElement[]);
}

export default findById;

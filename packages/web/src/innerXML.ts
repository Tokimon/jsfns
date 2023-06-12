const manualInnerXml = (XMLNode: Element) => {
  const serializer = new XMLSerializer();

  return Array
    .from(XMLNode.childNodes, (child) => serializer.serializeToString(child))
    .join('');
};

/**
 * Gets the inner XML structure as a string from a XML element
 * (like innerHTML but for XML elements - eg. in SVG)
 *
 * @param XMLNode - The XML node to grab the inner XML structure from
 * @returns The inner XML structure
 *
 * @example
 *
 * ```ts
 * innerXML(<div><span>my text</span></div>); // -> '<span>my text</span>'
 * innerXML(<svg><g><path /></g></svg>); // -> '<g><path /></g>'
 * ```
 */
export default function innerXML(XMLElement: Element): string {
  return XMLElement.innerHTML !== undefined
    ? XMLElement.innerHTML
    : manualInnerXml(XMLElement);
}

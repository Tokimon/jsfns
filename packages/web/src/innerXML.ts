const manualInnerXml = (XMLNode: Element) => {
	const serializer = new XMLSerializer();

	return Array.from(XMLNode.childNodes, (child) => serializer.serializeToString(child)).join('');
};

/**
 * Gets the inner XML structure as a string from a XML/HTML element
 * (like innerHTML but also for XML elements - eg. in SVG)
 *
 * @param XMLNode - The XML node to grab the inner XML structure from
 * @returns The inner XML structure
 *
 * @example
 *
 * ```ts
 * innerXML(<div><span>my text</span></div>); // --> '<span>my text</span>'
 * innerXML(<svg><g><path /></g></svg>); // --> '<g><path /></g>'
 * ```
 */
export function innerXML(elm: Element): string {
	return elm.innerHTML !== undefined ? elm.innerHTML : manualInnerXml(elm);
}

export default innerXML;

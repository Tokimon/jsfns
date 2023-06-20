const elmExp = /^[a-z]+/;
const nameExp = /[a-z][\w\d-]*/i;
const nameExpStr = nameExp.source;
const idExp = new RegExp(`#${nameExpStr}`, 'i');
const classExp = new RegExp(`\\.${nameExpStr}`, 'ig');
const attrExp = new RegExp(`\\[(${nameExpStr})(?:=([^\\]]+))?]`, 'g');

export type AttributeMapping = Map<string, Set<string>>;

export type SelectorParsing = {
  tagName: string;
  attributes: Record<string, string>;
  attributeList: string[];
};

const addAttribute = (attributeName: string, value: string | undefined, attributes: AttributeMapping): void => {
  if (value == null) return;

  const isId = attributeName === 'id';
  const hasAttribute = attributes.has(attributeName);

  // ID Attributes are only added once
  if (isId && hasAttribute) return;

  if (!hasAttribute) attributes.set(attributeName, new Set());

  // Clean class and ID values
  if (attributeName === 'class' || isId) value = value.replace(/[#.]/g, '');

  attributes.get(attributeName)?.add(value);
};

const parseAttribute = (selector: string, attributes: AttributeMapping) => {
  // This function detects the attribute from the selector,
  // and then removes it to avoid having to parse it again
  const replaceFn = (_: string, att: string, val: string | undefined) => {
    val = (val || '').replace(/^["']|["']$/g, '');
    addAttribute(att, val, attributes);
    return '';
  };

  return selector.includes('[') ? selector.replace(attrExp, replaceFn) : selector;
};

/**
 * Parses CSS a selector string into a structured object
 *
 * @param selector - The CSS selector to parse
 * @returns The attribute parsing mapping
 *
 * ```ts
 * parseSelector('.my-elm[name=test]') // --> { tagName: 'div', attributes: { name: 'test', class: 'my-elm' }, attributeList: ['name', 'class'] }
 * parseSelector('input[type=submit]') // --> { tagName: 'input', attributes: { type: 'submit' }, attributeList: ['type'] }
 * ```
 */
export function parseSelector(selector: string): SelectorParsing {
  const mapping = new Map() as AttributeMapping;

  // Tag name
  const tagNameMatch = selector.match(elmExp);
  const tagName = (tagNameMatch || ['div'])[0];

  // Attribute expressions
  selector = parseAttribute(selector, mapping);

  // ID
  const idMatch = selector.includes('#') && selector.match(idExp);

  if (idMatch) addAttribute('id', idMatch[0].slice(1), mapping);

  // Class names
  const cnMatch = selector.includes('.') && selector.match(classExp);

  if (cnMatch) cnMatch.forEach((cn) => addAttribute('class', cn.slice(1), mapping));

  const parsing: SelectorParsing = { tagName, attributes: {}, attributeList: [] };

  for (const [name, values] of mapping.entries()) {
    parsing.attributeList.push(name);
    parsing.attributes[name] = Array.from(values).join(' ');
  }

  return parsing;
}

export default parseSelector;

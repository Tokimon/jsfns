import { isString } from '@jsfns/core/isString';

const elmExp = /^[a-z]+/;
const nameExp = /[a-z][\w\d-]*/i;
const nameExpStr = nameExp.source;
const idExp = new RegExp(`#${nameExpStr}`, 'i');
const classExp = new RegExp(`\\.${nameExpStr}`, 'ig');
const attrExp = new RegExp(`\\[(${nameExpStr})(?:=([^\\]]+))?]`, 'g');

export type AttributeMapping = Record<string, string | true> & {
  class?: Set<string>;
};

export type SelectorParsing = {
  tagName: string;
  attributes: Record<string, string>;
  attributeList: string[];
};

function addClass(value: string, attributes: AttributeMapping) {
  if (!value) return;

  const set = attributes.class ?? new Set<string>();
  if (!attributes.class) attributes.class = set;

  value.split('.').forEach((cn) => cn && set.add(cn));
}

function addProp(attributeName: string, value: string, attributes: AttributeMapping, override?: boolean) {
  const setAttribute = !attributes[attributeName] || attributes[attributeName] === true;

  if (override || setAttribute) attributes[attributeName] = value || true;
}

function addId(value: string, attributes: AttributeMapping, override?: boolean) {
  value = value.replaceAll('#', '');
  if (value) addProp('id', value, attributes, override);
}

const addAttribute = (attributeName: string, value: string, attributes: AttributeMapping, override?: boolean): void => {
  if (attributeName === 'class') {
    addClass(value, attributes);
  } else if (attributeName === 'id') {
    addId(value, attributes, override);
  } else {
    addProp(attributeName, value, attributes, override);
  }
};

function parseAttribute(selector: string, attributes: AttributeMapping) {
  // This function detects the attribute from the selector,
  // and then removes it to avoid having to parse it again
  const replaceFn = (_: string, attributeName: string, value: string | undefined) => {
    value = (value ?? '').replace(/^["']|["']$/g, '');
    addAttribute(attributeName, value, attributes);
    return '';
  };

  return selector.includes('[') ? selector.replace(attrExp, replaceFn) : selector;
}

function convertMappingToAttributes(tagName: string, mapping: AttributeMapping) {
  const parsing: SelectorParsing = { tagName, attributes: {}, attributeList: [] };

  for (const [name, value] of Object.entries(mapping)) {
    parsing.attributeList.push(name);
    parsing.attributes[name] = value === true ? '' : isString(value) ? value : Array.from(value).join(' ');
  }

  return parsing;
}

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
  const mapping: AttributeMapping = {};

  // Tag name
  const tagNameMatch = selector.match(elmExp);
  const tagName = tagNameMatch?.[0] ?? 'div';

  // Attribute expressions
  selector = parseAttribute(selector, mapping);

  // ID
  const idMatch = selector.includes('#') && selector.match(idExp);
  if (idMatch) addAttribute('id', idMatch[0].slice(1), mapping, true);

  // Class names
  const cnMatch = selector.includes('.') && selector.match(classExp);
  if (cnMatch) cnMatch.forEach((cn) => addAttribute('class', cn.slice(1), mapping));

  return convertMappingToAttributes(tagName, mapping);
}

export default parseSelector;

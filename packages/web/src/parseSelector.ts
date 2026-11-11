import { isString } from '@jsfns/core/isString.js';
import type { Dictionary } from '@jsfns/core/types.js';

/** The attribute collection from the various parsings */
export type AttributeMapping = Record<string, string | true> & {
	/** Class name(s) of the tag */
	class?: Set<string>;
};

/** Summary of the selector parsing */
export type SelectorParsing = {
	/** Current tag name */
	tagName: string;
	/** Record of the tags final attributes */
	attributes: Record<string, string>;
	/** List of attributes on the tag */
	attributeList: string[];
};

/** What part of the selector the parser is currently reading */
type Mode = 'none' | 'tag' | 'id' | 'class' | 'attr';

const isLetter = (c: string) => c >= 'a' && c <= 'z';
const isDigit = (c: string) => c >= '0' && c <= '9';
const isBoundary = (c: string) => '.#['.includes(c) || !c.trim();

/** The part of the selector a character starts */
const modeStarts: Dictionary<Mode> = { '.': 'class', '#': 'id', '[': 'attr' };

function addClass(value: string, attributes: AttributeMapping) {
	if (!value) return;

	const set = attributes.class ?? new Set<string>();
	if (!attributes.class) attributes.class = set;

	set.add(value);
}

function addProp(
	attributeName: string,
	value: string,
	attributes: AttributeMapping,
	override?: boolean,
) {
	const setAttribute = !attributes[attributeName] || attributes[attributeName] === true;

	if (override || setAttribute) attributes[attributeName] = value || true;
}

function addId(value: string, attributes: AttributeMapping, override?: boolean) {
	const val = value.replaceAll('#', '');
	if (val) addProp('id', val, attributes, override);
}

const addAttribute = (
	attributeName: string,
	value: string,
	attributes: AttributeMapping,
	override?: boolean,
): void => {
	if (attributeName === 'class') {
		addClass(value, attributes);
	} else if (attributeName === 'id') {
		addId(value, attributes, override);
	} else {
		addProp(attributeName, value, attributes, override);
	}
};

/** Adds the content of an `[name=value]` expression (the part between the brackets) */
function addAttributeExpression(expression: string, attributes: AttributeMapping) {
	const eq = expression.indexOf('=');
	const name = eq < 0 ? expression : expression.slice(0, eq);
	const value = eq < 0 ? '' : expression.slice(eq + 1);

	// Strip the surrounding quotes (if any)
	if (name) addAttribute(name, value.replace(/^["']|["']$/g, ''), attributes);
}

function convertMappingToAttributes(tagName: string, mapping: AttributeMapping) {
	const parsing: SelectorParsing = {
		tagName,
		attributes: {},
		attributeList: [],
	};

	for (const [name, value] of Object.entries(mapping)) {
		parsing.attributeList.push(name);
		parsing.attributes[name] =
			value === true ? '' : isString(value) ? value : Array.from(value).join(' ');
	}

	return parsing;
}

/**
 * Parses CSS a selector string into a structured object
 *
 * Class names and IDs can be Tailwind like (`md:hidden`, `-ml-2`, `w-1/2`, `p-0.5`,
 * `bg-[#fff]`, `[&>div]:flex`) or CSS escaped (`md\:hidden`).
 *
 * @param selector - The CSS selector to parse
 * @returns The attribute parsing mapping
 *
 * ```ts
 * parseSelector('.my-elm[name=test]') // --> { tagName: 'div', attributes: { name: 'test', class: 'my-elm' }, attributeList: ['name', 'class'] }
 * parseSelector('input[type=submit]') // --> { tagName: 'input', attributes: { type: 'submit' }, attributeList: ['type'] }
 * parseSelector('.md:p-0.5.bg-[#fff]') // --> { tagName: 'div', attributes: { class: 'md:p-0.5 bg-[#fff]' }, attributeList: ['class'] }
 * ```
 */
export function parseSelector(selector: string): SelectorParsing {
	const mapping: AttributeMapping = {};
	const classes: string[] = [];

	let tagName = '';
	let id = '';
	let mode: Mode = 'tag'; // A tag name can only be at the start of the selector
	let token = ''; // The part of the selector we are currently reading
	let bracketDepth = 0; // Open "[" inside a class/ID name (Tailwind arbitrary values)
	let escaped = false; // The previous character was a backslash

	// Finishes the current part and stores it
	const endToken = () => {
		if (mode === 'tag') tagName = token;
		else if (mode === 'id')
			id ||= token; // Only the first ID counts
		else if (mode === 'class' && token) classes.push(token);
		else if (mode === 'attr') addAttributeExpression(token, mapping);

		mode = 'none';
		token = '';
	};

	for (let i = 0; i < selector.length; i++) {
		const c = selector[i];
		const inName = mode === 'class' || mode === 'id';

		if (inName && c === '\\' && !escaped) {
			escaped = true;
			continue;
		}

		let addToken = (mode === 'attr' && c !== ']') || (mode === 'tag' && isLetter(c));

		if (inName) {
			// "[" directly after "-" or ":" (or at the start) is an arbitrary value/variant,
			// otherwise it is the start of an attribute
			const opensBracket = c === '[' && (!token || token.endsWith('-') || token.endsWith(':'));

			if (escaped) {
				addToken = true;
				escaped = false;
			} else if (bracketDepth > 0 || opensBracket) {
				// Inside an arbitrary value everything belongs to the name
				addToken = true;
				bracketDepth += c === '[' ? 1 : c === ']' ? -1 : 0;
			} else {
				// A "." between two digits is a decimal and part of the name (`p-0.5`)
				const isDecimal = c === '.' && isDigit(token.slice(-1)) && isDigit(selector.charAt(i + 1));
				addToken = isDecimal || !isBoundary(c);
			}
		}

		if (addToken) {
			token += c;
		} else {
			// We hit the start of a new part
			endToken();
			mode = modeStarts[c] ?? 'none';
		}
	}

	if (mode !== 'attr') endToken();

	// Attributes are added first, so a normal "#id" takes precedence over `[id=...]`
	if (id) addAttribute('id', id, mapping, true);
	for (const cn of classes) addAttribute('class', cn, mapping);

	return convertMappingToAttributes(tagName || 'div', mapping);
}

export default parseSelector;

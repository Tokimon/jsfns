import isHTMLElement from './isHTMLElement.ts';

const nonEditableInputTypes = new Set([
	'button',
	'checkbox',
	'color',
	'file',
	'hidden',
	'image',
	'radio',
	'range',
	'reset',
	'submit',
]);

/**
 * Is the given object an element whose content or value a user can edit
 * directly.
 *
 * @remarks
 *
 * - Elements with an active `contenteditable` state are always editable
 * - `<textarea>` and `<input>` elements are editable unless read-only or
 *   disabled - including being disabled indirectly through an ancestor
 *   `<fieldset disabled>`
 * - `<input>` elements are additionally only editable when of a text-like
 *   type (i.e. not `button`, `checkbox`, `color`, `file`, `hidden`, `image`,
 *   `radio`, `range`, `reset`, or `submit`)
 * - `<select>` elements are never considered editable (its value is chosen,
 *   not typed)
 * - Anything that is not an `HTMLElement` is never editable
 *
 * @param obj - The object to test
 *
 * @returns Whether the object is an editable element or not
 *
 * @example
 * ```ts
 * isEditableElement(myTextInput); // --> true
 * isEditableElement(myContentEditableDiv); // --> true
 * isEditableElement(myDisabledTextInput); // --> false
 * isEditableElement(myCheckbox); // --> false
 * isEditableElement(mySelect); // --> false
 * isEditableElement(document); // --> false
 * ```
 */
export function isEditableElement(obj: unknown): boolean {
	if (!isHTMLElement(obj)) return false;

	if (obj.isContentEditable) return true;

	const isInput = obj instanceof HTMLInputElement;

	if (!(obj instanceof HTMLTextAreaElement || isInput)) return false;

	if (obj.readOnly || obj.matches(':disabled')) return false;
	return !isInput || !nonEditableInputTypes.has(obj.type);
}

export default isEditableElement;

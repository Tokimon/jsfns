import { nodeIndex } from '@jsfns/web/nodeIndex.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers.ts';

const testID = generateId('ElmIndex');
const SubNodeID = generateId('SubNode');

describe('"elmIndex"', () => {
	beforeAll(() => insertHtml(`<div id="${testID}"><b></b><b id='${SubNodeID}'></b><b><b></div>`));
	afterAll(() => removeElement(testID));

	it('Returns the index of a DOM element among its siblings', () => {
		const node = byId(SubNodeID);
		const index = nodeIndex(node);
		expect(index).toBe(1);
		expect(byId(testID).childNodes[index]).toBe(node);
	});

	it('Returns the index of a DOM element among its siblings - in a detached DOM element', () => {
		const p = createElement('p');
		p.innerHTML = '<b></b><b></b><b></b>';
		expect(nodeIndex(p.childNodes[2])).toBe(2);
	});

	it('Returns -1 when the element is not a Child Element', () => {
		const node = createElement('p');
		expect(nodeIndex(node)).toBe(-1);
		expect(nodeIndex(document.documentElement)).toBe(-1);
	});
});

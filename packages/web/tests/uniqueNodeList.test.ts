import { uniqueNodeList } from '@js-fns/web/uniqueNodeList';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('uniqueNodeList');

describe('"uniqueNodeList"', () => {
  let testNode: HTMLElement;

  const find = (cn: string) => document.getElementsByClassName(cn);

  beforeAll(() => {
    insertHtml(`
      <div id="${testID}">
        <div class="one item"></div>
        <div class="two item special"></div>
        <div class="three"></div>
        <div class="four item"></div>
        <div class="five special"></div>
        <div class="six item special"></div>
      </div>
    `);

    testNode = byId(testID);
  });

  afterAll(() => removeElement(testID));

  it('Returns a unique list of elements', () => {
    const list = uniqueNodeList(testNode.children[0], testNode.children[0]);
    expect(list).toHaveLength(1);
  });

  it('Returns a unique list of elements from multiple collections', () => {
    const list = uniqueNodeList(testNode.children[3], find('item'), find('special'));
    expect(list).toHaveLength(5);
  });

  it('Null elements are filtered out', () => {
    const list = uniqueNodeList(testNode.children[3], null);
    expect(list).toHaveLength(1);
    expect(list[0]).toBe(testNode.children[3]);
  });
});

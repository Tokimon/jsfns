import { elementData, resetCache } from "@jsfns/web/elementData";
import { byId, generateId, insertHtml, removeElement } from "./assets/helpers";

const testID = generateId("ElementData");

describe('"elementData"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  afterAll(() => removeElement(testNode));

  describe("Stores given data under the given key for a given element", () => {
    const data = [
      ["object", { a: 1 }],
      ["array", [1]],
      ["string", "string"],
      ["number", 1],
      ["boolean", true],
    ] as const;

    beforeEach(() => {
      resetCache();
      for (const [key, value] of data) elementData(testNode, key, value);
    });

    afterAll(resetCache);

    test("Get all stored data", () => {
      const obj = data.reduce<Record<string, unknown>>((o, [key, value]) => {
        o[key] = value;
        return o;
      }, {});

      expect(elementData(testNode)).toEqual(obj);
    });

    test.each(data)("Retrieves data for the given key: %s", (key, value) => {
      expect(elementData(testNode, key)).toBe(value);
    });

    test("Returns the given value after setting it", () => {
      expect(elementData(testNode, "key", "value")).toBe("value");
    });

    test("data = `null` deletes the stored data entry", () => {
      const deleteKey = data[2][0];
      const obj = data.reduce<Record<string, unknown>>((o, [key, value]) => {
        if (key !== deleteKey) o[key] = value;
        return o;
      }, {});

      elementData(testNode, deleteKey, null);
      expect(elementData(testNode)).toEqual(obj);
    });
  });

  describe("Returns undefined when", () => {
    beforeEach(resetCache);
    afterAll(resetCache);

    test("No data is stored for the given element", () => {
      expect(elementData(testNode)).toBeUndefined();
    });

    test("No data is stored with the given key for the given element", () => {
      elementData(testNode, "stuff", "value");
      expect(elementData(testNode, "key")).toBeUndefined();
    });

    test("When data is `null` and no data was stored", () => {
      expect(elementData(testNode, "key", null)).toBeUndefined();
    });

    test("When entry is deleted", () => {
      expect(elementData(testNode, "key", "value")).toBe("value");
      expect(elementData(testNode, "key", null)).toBeUndefined();
    });
  });

  describe('"resetCache"', () => {
    test("Removes stored data for a node", () => {
      elementData(testNode, "key", "value");
      expect(elementData(testNode)).toEqual({ key: "value" });

      resetCache();
      expect(elementData(testNode)).toBeUndefined();
    });

    test("Removes stored data for all nodes", () => {
      elementData(testNode, "key", "value");
      elementData(testNode, "and now", "for something different");
      elementData(document.body, "body", "nice");

      expect(elementData(testNode)).toEqual({
        key: "value",
        "and now": "for something different",
      });
      expect(elementData(document.body)).toEqual({ body: "nice" });

      resetCache();
      expect(elementData(testNode)).toBeUndefined();
      expect(elementData(document.body)).toBeUndefined();
    });
  });
});

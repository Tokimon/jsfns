export type CSSStyleKey = Exclude<
  Exclude<keyof CSSStyleDeclaration, number>,
  'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty' | 'length' | 'parentRule'
>;

export type Noop = () => void;

export type GeneralWindow = Window | typeof window;

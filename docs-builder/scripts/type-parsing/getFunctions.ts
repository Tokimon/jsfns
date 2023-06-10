import { type Kind_Function, type Kind_Module } from '~/types';
import { ReflectionKind } from 'typedoc';

export function getFunctions(module: Kind_Module): Kind_Function[] {
  let methodFunc: Kind_Function | undefined;
  const other: Kind_Function[] = [];

  for (const child of module.children) {
    if (child.kind !== ReflectionKind.Function) continue;

    if (child.name === 'default') {
      if (!methodFunc) methodFunc = child;
    } else if (child.name === module.name) {
      methodFunc = child;
    } else {
      other.push(child);
    }
  }

  if (!methodFunc) return other;

  if (methodFunc.name === 'default') methodFunc.name = module.name;
  return [methodFunc].concat(other);
}

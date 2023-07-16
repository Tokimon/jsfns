import type { Kind_Signature } from '../types';
import { buildParam } from './buildProperty';
import { buildSummary } from './buildSummary';
import { TSCodeMarkdown } from './markdown';
import type { TypeStringFunction } from './typeString';

export const buildSignature = (typeString: TypeStringFunction, name: string, signature: Kind_Signature) => {
  const { type, parameters, typeParameter } = signature;
  const params = parameters?.map((param) => buildParam(typeString, param)) || [];

  let typeDef = typeParameter
    ?.filter(({ flags }) => !flags?.isExternal)
    .map((t) => {
      const ext = t.type ? ` extends ${typeString(t.type)}` : '';
      return `${t.name}${ext}`;
    })
    .join(', ');

  if (typeDef) typeDef = `<${typeDef}>`;

  const paramComments = (parameters || []).reduce<Record<string, string>>((rec, { name, comment }) => {
    const desc = buildSummary(comment?.summary);
    if (desc) rec[name] = desc;
    return rec;
  }, {});

  let md = TSCodeMarkdown(`${name}${typeDef || ''}(${params.join(', ')}): ${typeString(type)}`);
  md = md.replaceAll(/(class="hljs-attr")([^>]*>)([^<]*)(<)/g, (all, _class, restOfTag, name, endTag) => {
    const desc = paramComments[name as string];
    if (paramComments[name as string]) _class += ` title="${desc}"`;
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return _class + ' title="does stuff"' + restOfTag + name + endTag;
  });

  return md;
};

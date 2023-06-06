import type { PropertyKind } from '../types';
import { buildComment } from './buildComment';
import type { TypeStringFunction } from './typeString';

export function buildObject(typeString: TypeStringFunction, properties: PropertyKind[]) {
	const props = properties.flatMap((prop) => {
		const parts: string[] = [];
		const comment = buildComment(prop.comment) || '';
		if (comment) parts.push('// ' + comment);
		parts.push(`${prop.name}${prop.flags.isOptional ? '?' : ''}: ${typeString(prop.type)}`);
		return parts;
	});

	return props.length ? `{\n  ${props.join('\n  ')}\n}` : '{}';
}

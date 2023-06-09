import type { Kind_Property } from '~/scripts/types';
import { buildSummary } from '~/scripts/utils/buildSummary';
import { buildProperty } from '~/scripts/utils/buildProperty';
import type { TypeStringFunction } from '~/scripts/utils/typeString';

export function buildObject(typeString: TypeStringFunction, properties: Kind_Property[]) {
	const props = properties.flatMap((prop) => {
		const parts: string[] = [];
		const comment = buildSummary(prop.comment?.summary) || '';

		if (comment) parts.push('// ' + comment);
		parts.push(buildProperty(typeString, prop));

		return parts;
	});

	return props.length ? `{\n  ${props.join('\n  ')}\n}` : '{}';
}

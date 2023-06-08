import type { Kind_Param, Kind_Property } from '$lib/types';
import type { TypeStringFunction } from './typeString';

export function buildProperty(typeString: TypeStringFunction, prop: Kind_Property | Kind_Param) {
	const { name, flags, type, defaultValue } = prop;
	const optional = flags.isOptional ? '?' : '';
	const defVal = defaultValue ? ' = ' + defaultValue : '';

	return `${name}${optional}: ${typeString(type)}${defVal}`;
}

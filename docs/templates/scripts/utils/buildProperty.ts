import type {
	All_Types,
	Kind_Param,
	Kind_Property,
	Flags,
	Element_NamedTupleMember
} from '~/scripts/types';
import type { TypeStringFunction } from '~/scripts/utils/typeString';

export function buildProperty(typeString: TypeStringFunction, prop: Kind_Property | Kind_Param) {
	const { name, flags, type, defaultValue } = prop;
	return buildPropertyLike(typeString, { name, flags, type, defaultValue });
}

export function buildElement(typeString: TypeStringFunction, prop: Element_NamedTupleMember) {
	const { name, isOptional, element, defaultValue } = prop;
	return buildPropertyLike(typeString, {
		name,
		flags: { isOptional },
		type: element,
		defaultValue
	});
}

type PropertyLikeProp = {
	name: string;
	flags: Flags;
	type: All_Types;
	defaultValue?: string;
};

export function buildPropertyLike(typeString: TypeStringFunction, prop: PropertyLikeProp) {
	const { name, flags, type, defaultValue } = prop;
	const optional = flags.isOptional ? '?' : '';
	const defVal = defaultValue ? ' = ' + defaultValue : '';

	return `${name}${optional}: ${typeString(type)}${defVal}`;
}

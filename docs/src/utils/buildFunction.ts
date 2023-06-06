import type { CallSignatureKind } from '../types';
import type { TypeStringFunction } from './typeString';

export const buildFunction = (
	typeToString: TypeStringFunction,
	name: string,
	signature: CallSignatureKind
) => {
	const params = signature.parameters?.map(({ name, flags, type, defaultValue }) => {
		const optional = flags.isOptional ? '?' : '';
		const defVal = defaultValue ? ' = ' + defaultValue : '';

		return `${name}${optional}: ${typeToString(type)}${defVal}`;
	});

	return `${name}(${params?.join(', ')}): ${typeToString(signature.type)}`;
};

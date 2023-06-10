import { Type_Predicate } from '~/scripts/types';

export const buildPredicate = (type: Type_Predicate) =>
	`boolean (${type.name} is ${type.targetType.name})`;

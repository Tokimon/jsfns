import { writable } from 'svelte/store';
import type { TypeAliasKind } from '../types';

export type StoreDictionary = Record<string, TypeAliasKind | undefined>;

function createTypeReferenceStore() {
	const { subscribe, update } = writable<StoreDictionary>({});

	return {
		subscribe,
		add: (type: TypeAliasKind) => {
			update((current) => {
				if (current[type.name]) return current;
				return { ...current, [type.name]: type };
			});
		}
	};
}

export const typeReferences = createTypeReferenceStore();

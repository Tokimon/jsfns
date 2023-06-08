import { writable } from 'svelte/store';
import type { Kind_TypeAlias } from '$lib/types';

export type StoreDictionary = Record<string, Kind_TypeAlias | undefined>;

function createTypeReferenceStore() {
	const { subscribe, update } = writable<StoreDictionary>({});

	return {
		subscribe,
		add: (type: Kind_TypeAlias) => {
			update((current) => {
				if (current[type.name]) return current;
				return { ...current, [type.name]: type };
			});
		}
	};
}

export const typeReferences = createTypeReferenceStore();

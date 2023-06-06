<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	import docsJson from '$lib/docs/core.json';
	import type { RootDocObject } from 'src/types';
	import Page from '../components/page.svelte';

	// TODO: LEARN ABOUT THIS
	export const hydrate = dev;
	export const router = browser;

	// TODO: get info from package.json
	const version = '1.0.0';
	const pageDescription = 'Core description';

	const docs = docsJson as RootDocObject;
</script>

<Page
	title={`${docs.name} v. ${version}`}
	description={pageDescription}
	modules={[...docs.children]}
/>
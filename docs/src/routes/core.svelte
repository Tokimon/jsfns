<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	import docsJson from '$lib/docs/core.json';
	import type { RootDocObject } from 'src/types';
	import Menu from '../components/menu.svelte';
	import Module from '../components/module.svelte';

	// TODO: LEARN ABOUT THIS
	export const hydrate = dev;
	export const router = browser;

	// TODO: get info from package.json
	const version = '1.0.0';
	const pageDescription = 'Core description';

	const docs = docsJson as RootDocObject;
</script>

<script lang="ts">
	const modules = [...docs.children].sort((a, b) => {
		const aName = a.name.toLowerCase();
		const bName = b.name.toLowerCase();

		return aName > bName ? 1 : aName === bName ? 0 : -1
	});
</script>


<style>
	.page {
		display: grid;
		grid-template-areas:
    'header header'
    'nav content';
  	grid-template-columns: 250px 1fr;
		--header-hight: 50px;
	}

	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #212d36;
		color: white;
		padding: 0 10px;
		grid-area: header;
		height: var(--header-hight);
		display: flex;
		align-items: center;
	}

	.page-title {
		margin: 0;
		font-size: 18px;
	}

	.content {
		grid-area: content;
		padding: 0 7px;
	}
</style>

<svelte:head>
	<title>{docs.name} v. {version}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<main class="page">
	<header class="header">
		<h2 class="page-title">{docs.name}</h2>
	</header>

	<Menu names={modules.map((c) => c.name)}/>

	<article class="content">
		{#each modules as module}
			<Module module={module} />
		{/each}
	</article>
</main>
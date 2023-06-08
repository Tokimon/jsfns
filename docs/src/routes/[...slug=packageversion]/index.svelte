<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Menu from '$lib/components/menu.svelte';
	import Module from '$lib/components/module.svelte';
	import docs from '$lib/data/docs.json';
	import { description } from '$lib/data/package-info.json';
	import packages from '$lib/data/packages.json';
	import type { Kind_Module } from '$lib/types';

	// export const ssr = true; // TODO https://kit.svelte.dev/docs/hooks#handle
	export const hydrate = true;
</script>

<script lang="ts">
	const { slug } = $page.params;
	const [packageName, version] = slug.split('/');
	const versions = packages[packageName as (keyof typeof packages)];

	const currentVersion = version ?? versions[0];

  let modules = [...docs.children] as Kind_Module[];
	
	let menuOpen = false;
	const toggleMenu = () => { menuOpen = !menuOpen; }

  $: {
    modules.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      return aName > bName ? 1 : aName === bName ? 0 : -1
    })
  }

	$: title = `@js-fns/${packageName} v. ${currentVersion}`
</script>


<style>
	.page {
		--header-hight: 50px;
		
		grid-template-areas:
    'header header'
    'nav content';
  	grid-template-columns: 200px 1fr;
	}

	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: #212d36;
		color: white;
		padding: 0 10px;
		grid-area: header;
		height: var(--header-hight);
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.page-title {
		margin: 0;
		font-size: 18px;
		flex: 1 1 100%;
	}

	.content {
		grid-area: content;
		padding: 0 15px;
		overflow: hidden;
		position: relative;
		z-index: 9;
		container-type: inline-size;
	}

	.menu-trigger {
		width: 22px;
    height: 16px;
		border: 0;
		background: linear-gradient(white, white 25%, transparent 25%, transparent);
		background-repeat: repeat;
		background-size: 1px 7px;
		appearance: none;
	}

	.menu-trigger,
	.repository {
		flex: 0 0 auto;
	}

	.repository img {
		width: 20px;
		aspect-ratio: 1;
	}

	@media (min-width: 800px) {
		.page {
			display: grid;
		}

		.menu-trigger {
			display: none;
		}
	}
</style>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<main class="page">
	<header class="header">
		<button type="button" class="menu-trigger" on:click={toggleMenu} />

		<h2 class="page-title">{title}</h2>
		
		<a target='_blank' href='https://www.npmjs.com/package/@js-fns/{packageName}' class="repository">
			<img src='https://static.npmjs.com/f1786e9b7cba9753ca7b9c40e8b98f67.png' alt='npm' />
		</a>

		<a target='_blank' href='https://github.com/Tokimon/js-fns/{packageName}' class="repository">
			<img src='https://github.githubassets.com/favicons/favicon-dark.svg' alt='Github' />
		</a>
	</header>

	<Menu names={modules.map((c) => c.name)} open={menuOpen} />

	<article class="content">
		{#each modules as module}
			<Module {module} />
		{/each}
	</article>
</main>
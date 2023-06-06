<script context="module" lang="ts">
	import type { ModuleKind } from 'src/types';
	import Menu from '../components/menu.svelte';
	import Module from '../components/module.svelte';
</script>

<script lang="ts">
  export let title: string;
  export let description: string;
  export let modules: ModuleKind[] = [];
	
  $: {
    modules.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      return aName > bName ? 1 : aName === bName ? 0 : -1
    })
  }
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
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<main class="page">
	<header class="header">
		<h2 class="page-title">{title}</h2>
	</header>

	<Menu names={modules.map((c) => c.name)}/>

	<article class="content">
		{#each modules as module}
			<Module {module} />
		{/each}
	</article>
</main>
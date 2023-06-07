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
		padding: 0 7px;
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
		<h2 class="page-title">{title}</h2>
	</header>

	<Menu names={modules.map((c) => c.name)}/>

	<article class="content">
		{#each modules as module}
			<Module {module} />
		{/each}
	</article>
</main>
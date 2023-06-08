<script lang="ts">
  import { browser } from '$app/env';
  import { onMount } from 'svelte';

	export let open = false;
  export let names: string[] = [];

	const getHash = () => browser ? location.hash.slice(1) : '';

	let current = getHash();
	
	const onHashChange = () => { current = getHash() };

	onMount(() => {
		if (!browser) return;

		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	})
</script>

<style>
	.menu {
		grid-area: nav;
		position: fixed;
		z-index: 98;
		width: 200px;
		top: var(--header-hight);
		bottom: 0;
		left: 0;
		background: #131a20;
		overflow-y: auto;
		overflow-x: hidden;
		translate: -100% 0;
		transition: translate 0.3s ease;
		font-size: 18px;
	}

	.menu.open {
		translate: 0;
	}

	.menu-list {
		margin: 0;
		padding: 0;
		list-style: none;
		padding: 10px 0;
		box-shadow: inset 0 0 0 transparent;
	}

	.menu-list-item a {
		color: #ccc;
		text-decoration: none;
		padding: 10px;
		display: block;
		transition: all 0.2s;
	}

	.menu-list-item.current a {
		background: rgba(122,150,174, 0.25);
		box-shadow: inset 5px 0 0 cornflowerblue;
    padding-left: 20px;
	}

	.menu-list-item a:hover,
	.menu-list-item a:focus {
		background: rgba(255, 255, 255, 0.15);
		outline: none;
	}

	@media (min-width: 800px) {
		.menu {
			translate: 0;
		}
	}
</style>

<nav class="menu" class:open={open}>
  <ul class="menu-list">
    {#each names as name}
      <li class="menu-list-item" class:current={current === name}>
        <a href={'#' + name}>{name}</a>
      </li>
    {/each}
  </ul>
</nav>
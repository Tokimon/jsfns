<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  export let names: string[] = [];

	const getHash = () => typeof location !== 'undefined' ? location.hash.slice(1) : '';

	let current = getHash();
	
	const onHashChange = () => { current = getHash() };

	onMount(() => {
		if (typeof window === 'undefined') return;
		window.addEventListener('hashchange', onHashChange)
	})

	onDestroy(() => {
		if (typeof window === 'undefined') return;
		window.removeEventListener('hashchange', onHashChange)

	})
</script>

<style>
	.menu {
		grid-area: nav;
		position: fixed;
		width: 250px;
		top: var(--header-hight);
		bottom: 0;
		left: 0;
		background: #131a20;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.menu-list {
		margin: 0;
		padding: 0;
		list-style: none;
		padding: 5px 0;
	}

	.menu-list-item.current {
		background: rgba(122,150,174, 0.25);
	}

	.menu-list-item a {
		color: #ccc;
		text-decoration: none;
		padding: 5px 10px;
		display: block;
	}

	.menu-list-item a:hover,
	.menu-list-item a:focus {
		background: rgba(255, 255, 255, 0.15);
		outline: none;
	}
</style>

<nav class="menu">
  <ul class="menu-list">
    {#each names as name}
      <li class="menu-list-item" class:current={current === name}>
        <a href={'#' + name}>{name}</a>
      </li>
    {/each}
  </ul>
</nav>
<script context="module" lang="ts">
	import packages from '$lib/data/packages.json';
	// export const ssr = true; // TODO https://kit.svelte.dev/docs/hooks#handle
</script>

<script lang="ts">
	const packageNames = Object.keys(packages).sort();
</script>

<svelte:head>
	<title>@js-fns</title>
</svelte:head>

<main>
	<h1>@js-fns</h1>

	{#each packageNames as packageName}
		<a class="package-link" href="/{packageName}">
			/{packageName}
		</a>
	{/each}
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 50px;
	}

	.package-link {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #444;
		border-radius: 4px;
		height: 100px;
		width: 100px;
		font-size: 20px;
		color: inherit;
		font-weight: 600;
		text-decoration: none;
		transition: background-color 0.2s;
	}
	
	.package-link:hover,
	.package-link:focus {
		background: #58b29a;
	}
</style>

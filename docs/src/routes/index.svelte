<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	const pageDescription = 'Description of js-fns';
</script>

<svelte:head>
	<title>@js-fns</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<main>
	<h1>@js-fns</h1>

	<a class="package-link" href="/core">
		/core
	</a>

	<a class="package-link" href="/web">
		/web
	</a>
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
	}
	
	.package-link:hover,
	.package-link:focus {
		background: #4fe3bb;
	}
</style>

<script>
	export let data;
    import { page } from "$app/stores";
</script>

<div class="text-center my-16">

{#if $page.data.user}
    <h1 class="text-6xl font-bold max-w-3xl mx-auto">{data.name}</h1>
    <p>{data.symbol}</p>
{:else}
    <h2>Please Log in to access the predictions</h2>
{/if}
</div>
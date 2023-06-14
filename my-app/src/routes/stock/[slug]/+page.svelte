<script>
	export let data;
    import { page } from "$app/stores";
    import CloseCircle from "$lib/assets/CloseCircle.svelte";
</script>

<div class="text-center my-16">

{#if $page.data.user}
    <h1 class="text-6xl font-bold max-w-3xl mx-auto">{data.name}</h1>
    <p>{data.symbol}</p>
{:else}
    <div class="mx-auto flex justify-center w-16 mb-16 text-red dark:text-blue">
    <CloseCircle />
  </div>
    <h2>Please <a href="/login" class="text-blue">Log In</a> to access the predictions</h2>
{/if}
</div>
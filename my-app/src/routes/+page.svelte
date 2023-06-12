<script>
    export let data;

    let search = '';
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'];
    let results = [];

    $: {
    if (search.length > 0) {
      const lowerCaseSearch = search.toLowerCase();
      results = items.filter(item => item.toLowerCase().includes(lowerCaseSearch)).slice(0, 5);
    } else {
      results = [];
    }
  }
</script>
  
  <div class="text-center my-32">
  
    <h1 class="text-6xl font-bold max-w-3xl mx-auto">
      Make Money Smarter
    </h1>
    <div class="flex flex-col items-center justify-center my-16">
      <input class="
      w-1/3 px-3 py-2 rounded-full border-2 border-black focus:outline-none focus:shadow-outline 
      dark:bg-lightbg" 
      type="text" placeholder="Enter Stock..."
      bind:value={search} />

      {#if search !== ''}
          <div class= "w-1/3 bg-white text-black shadow-lg max-h-60 rounded-lg overflow-auto">
              {#if results.length === 0}
                  <div class="px-4 py-2">No results found</div>
              {:else}
                  {#each results as result, i}
                      <div class="border-t border-gray-100 first:border-t-0 px-4 py-2 hover:bg-blue" data-result={i}>
                          <p>{ result }</p>
                      </div>
                  {/each}
              {/if}
          </div>
      {/if}
    </div>

    <div class="fixed bottom-0 right-0 p-4">
      <a href="/help" class="text-black rounded-full px-4 py-2 dark:text-white">Help</a>
      
    </div>
  </div>
  
<script>
  import Cross from "$lib/assets/Cross.svelte"
  import {page} from '$app/stores';
  import {formatDBDate} from '$lib/formatDate';
  export let data;

  let stockId = -1;
  let selectedStockSymbol = '';
  let selectedStockName = '';
  let error = '';

  let searchInput = '';
  let searchResults = [];
  let key = $page.data.user.key;

  // Helper function to call the API
  async function callApi(symbol) {
    const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${key}`);
    const data = await response.json();

    if(data.Note) {
      error = data.Note;
      return [];
    }
    return data.bestMatches;
  }

  // This function is called whenever the input changes
  async function searchStocks(event) {
    searchInput = event.target.value;
    if (searchInput) {
      searchResults = await callApi(searchInput);
    } else {
      searchResults = [];
    }
  }
</script>

<div class="w-full mx-4">
  <div>
    <h1 class="text-4xl mb-1 dark:text-gray mt-2 font-bold">My Stocks</h1>
  </div>

  <form method="POST">
    <div class="my-8">
      <h1 class="text-2xl mb-1 dark:text-gray-100 mt-2 font-semibold">My Stocks</h1>
      <hr class="dark:border-gray-500"/>

      {#if data.stockList.length === 0}

      <div class="text-left my-8">
        <p class="text-gray-500">You have no stocks added</p>
      </div>
        
      {/if}

      {#each data.stockList as stock}

      <div class="py-8 flex justify-between w-full border-b-2 dark:border-gray-700">
        <a href="/stock/{stock.stock.symbol}" class="hover:text-blue ease-in-out duration-200">
          <p class="font-medium">
            {stock.stock.name}
            <span class="text-gray-500 font-normal"
              >/ {stock.stock.symbol}</span
            >
          </p>
          <p class="text-gray-500">
            Added - {formatDBDate(stock.dateAdded)}
          </p>
        </a>
        <input type="hidden" name="id" value={stockId} />
        <button
          type="submit"
          on:click={() => (stockId = stock.id)}
          formaction="?/removeStock"
          class="p-2 mr-8 font-medium hover:scale-150 ease-in-out duration-300"
        >
          <Cross />
        </button>
      </div>
      {/each}

    </div>
  

  <div class="my-8">
    <h1 class="text-2xl mb-1 dark:text-gray-100 mt-2 font-semibold">Follow New Stock</h1>
    <hr class="dark:border-gray-500"/>
    <p>{error}</p>

    <div class="my-4 w-1/3">
      <input type="text" bind:value={searchInput} on:input={searchStocks} placeholder="Search for a stock symbol..." 
      class="
      w-full px-5 py-3 border-2 border-gray-500 focus:outline-none focus:shadow-outline 
      dark:bg-medbg
      dark:border-none" >

      <div class= "w-full bg-white text-black shadow-lg cursor-pointer dark:bg-medbg
              dark:border-none dark:text-white">
        {#each searchResults as result (result['1. symbol'])}
          <input type="hidden" name="symbol" value={selectedStockSymbol} />
          <input type="hidden" name="name" value={selectedStockName} />
          <button class="dark:border-white px-4 py-2 w-full hover:bg-gray-100 text-left dark:hover:bg-blue"
          on:click={() => {
            selectedStockSymbol = result['1. symbol']; 
            selectedStockName = result['2. name']}}
            
          formaction="?/addStock"
          >
          {result['1. symbol']} - {result['2. name']}
          </button>
        {/each}
      </div>
    </div>

  </div>
</form>
</div>
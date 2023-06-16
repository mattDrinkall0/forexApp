<script>
  import ArrowBox from "$lib/assets/ArrowBox.svelte"
  export let data;
  export let form;
</script>

<div class="w-full mx-4">
  <div>
    <h1 class="text-4xl mb-1 dark:text-gray mt-2 font-bold">API Key</h1>
  </div>

  <form action="/account/apiKey" method="POST">

    <div class="my-8">
      <h1 class="text-2xl mb-1 dark:dark:text-gray-100 mt-2 font-semibold">Alpha Vantage API Key</h1>
      <hr class="dark:border-gray-500"/>
  
      <div class="mt-4">
        <p class="dark:text-gray-300 my-4">To access the main features on AlphaForex you are required to set up a FREE API key with Alpha Vantage to access these features.</p>
        <p class="dark:text-gray-300 my-4">Please follow the steps below to generate your API Key.</p>

        <ul class="list-disc pl-5">
          <li class="my-2">Go to the Alpha Vantage Website</li>
          <li class="my-2">Click "Get Your free API Key Today"</li>
          <li class="my-2">Fill out the form</li>
          <li class="my-2">Once you have submitted the form, copy and paste the key into the box below</li>
        </ul>

        <a href="https://www.alphavantage.co/support/#api-key" class="flex gap-4 px-6 py-3 text-gray-200 bg-lightbg w-36 justify-between"> <ArrowBox />Website</a>

        <div class="mt-12 mb-6">
          <label class="block dark:text-gray-300" for="key">Key</label>
          <input class="dark:bg-medbg dark:border-none dark:focus:bg-bodybg w-1/3" type="text" name="key" id="key" value="{data.user.key}"/>
          {#if form?.incorrect}<p class="text-red">*Invalid API Key</p>{/if}
        </div>
    </div>

    <div class="flex justify-start">
    <button
      type="submit"
      class="bg-blue text-white py-3 px-8 rounded-full border-2 border-none hover:bg-medbg transition-all duration-200"
    >
      Save Changes
    </button>
  </div>
  
  </form>
</div>

<style>
    input {
      @apply border-2 border-gray-400 py-2 px-5 my-1 focus:outline-none focus:shadow-outline focus:bg-gray-300 bg-gray-100;
    }
</style>

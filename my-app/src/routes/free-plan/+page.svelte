<script>
    import CloseCircle from "$lib/assets/CloseCircle.svelte"
</script>

<div class="text-center my-32">
    <div class="mx-auto flex justify-center w-16 mb-8 text-red">
    <CloseCircle />
  </div>
  <h1 class="text-3xl font-semibold">Search Unsuccessful</h1>
  <p class="text-gray-500 dark:text-gray-300 mt-8 mb-12">
    You have reached your search limit. Please try again later.
  </p>

  <a class="bg-blue hover:bg-lightbg font-semibold py-3 px-10 rounded-full transition-all duration-200" href='/pricing'>Premium Plans</a>

  <a href="/" class="flex gap-2 text-gray-800 dark:text-gray-500 justify-center mt-4"
    >Go back to the homepage
  </a>
</div>
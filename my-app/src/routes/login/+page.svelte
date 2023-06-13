<script>
  import { enhance } from "$app/forms";

  export let form;
</script>

<h1 class="text-center text-2xl font-medium my-12 mb-16">Log In</h1>

<div class="max-w-lg mx-auto">
  {#if form?.messages}
    {#each form?.messages as message}
      <ul
        class="bg-red-100 border-red-300 border-2 p-6 mt-3 mb-6 rounded-md text-red list-disc dark:bg-lightbg dark:border-none dark:text-red"
      >
        <li class="ml-4">{message}</li>
      </ul>
    {/each}
  {/if}

  <form method="POST" class="flex flex-col gap-4" use:enhance>
    <div class="flex flex-col">
      <input class="dark:bg-lightbg dark:border-none dark:focus:bg-lightbg" type="email" name="email" id="email" value={form?.email ?? ""} placeholder="Email"/>
    </div>

    <div class="flex flex-col">
      <input class="dark:bg-lightbg dark:border-none dark:focus:bg-lightbg" type="password" name="password" id="password" placeholder="Password" />
    </div>

    <button
      type="submit"
      class="bg-blue text-white py-3 rounded-full border-2 border-none hover:bg-medbg my-4"
    >
      Log In
    </button>
  </form>

  <p class="text-center my-6 text-gray-600 dark:text-gray-400">
    Don't have an account? <a href="/create-account" class="text-blue"
      >Create one now</a
    >
  </p>
</div>

<style>
  input {
    @apply border-2 border-gray-400 py-3 px-5 my-1 rounded-full focus:outline-none focus:shadow-outline focus:bg-gray-100;
  }
</style>

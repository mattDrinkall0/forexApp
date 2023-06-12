<script>
  import { enhance } from "$app/forms";

  export let form;
</script>

<h1 class="text-center text-2xl font-medium my-12 mb-16">Log In</h1>

<div class="max-w-lg mx-auto">
  {#if form?.messages}
    {#each form?.messages as message}
      <ul
        class="bg-red-100 border-red-300 border-2 p-6 mt-3 mb-6 rounded-md text-red list-disc"
      >
        <li class="ml-4">{message}</li>
      </ul>
    {/each}
  {/if}

  <form method="POST" class="flex flex-col gap-4" use:enhance>
    <div class="flex flex-col">
      <label for="email" class="ml-3">Email Address</label>
      <input type="email" name="email" id="email" value={form?.email ?? ""} />
    </div>

    <div class="flex flex-col">
      <label for="password" class="ml-3">Password</label>
      <input type="password" name="password" id="password" />
    </div>

    <button
      type="submit"
      class="bg-blue text-white py-3 rounded-md border-2 border-blue-500 my-4"
    >
      Log In
    </button>
  </form>

  <p class="text-center my-6 text-gray-600">
    Don't have an account? <a href="/create-account" class="text-blue-500"
      >Create one now</a
    >
  </p>
</div>

<style>
  input {
    @apply border-2 border-gray rounded-md py-2 px-3 my-1;
  }
</style>

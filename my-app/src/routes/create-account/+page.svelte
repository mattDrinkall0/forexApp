<script>
  import { enhance } from "$app/forms";

  export let form;
</script>

<h1 class="text-center text-2xl font-medium my-12 mb-16">Create Account</h1>

<div class="max-w-lg mx-auto">
  {#if form?.messages}
    <ul
      class="bg-red-100 border-red-300 border-2 p-6 mt-3 mb-10 rounded-md text-red list-disc dark:bg-medbg dark:border-none dark:text-red"
    >
      {#each form?.messages as message}
        <li class="ml-4">{message}</li>
      {/each}
    </ul>
  {/if}

  <form method="POST" class="flex flex-col gap-4" use:enhance>
    <div class="grid grid-cols-2 gap-4">
      <input class="w-full dark:bg-medbg dark:border-none dark:focus:bg-bodybg" placeholder="First Name" type="text" name="firstName" id="first-name" />
      <input class="w-full dark:bg-medbg dark:border-none dark:focus:bg-bodybg" placeholder="Last Name" type="text" name="lastName" id="last-name" />
    </div>

    <input class="dark:bg-medbg dark:border-none dark:focus:bg-bodybg" placeholder="Email" type="email" name="email" id="email" />

    <input class="dark:bg-medbg dark:border-none dark:focus:bg-bodybg" placeholder="Password" type="password" name="password" id="password" />

    <button
      type="submit"
      class="bg-blue text-white py-3 border-2 border-none hover:bg-bodybg dark:hover:bg-lightbg my-4 transition-all duration-200"
    >
      Create Account
    </button>
  </form>

  <p class="text-center my-6 text-gray-600 dark:text-gray-400">
    Already have an account? <a href="/login" class="text-blue">Log in</a>
  </p>
</div>

<style>
  input {
    @apply border-2 border-gray-400 py-3 px-5 my-1 focus:outline-none focus:shadow-outline focus:bg-gray-100;
  }
</style>

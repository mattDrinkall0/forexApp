<script>
  import { enhance } from "$app/forms";

  export let form;
</script>

<h1 class="text-center text-2xl font-medium my-12 mb-16">Create Account</h1>

<div class="max-w-lg mx-auto">
  {#if form?.messages}
    <ul
      class="bg-red-100 border-red-300 border-2 p-6 mt-3 mb-10 rounded-md text-red list-disc"
    >
      {#each form?.messages as message}
        <li class="ml-4">{message}</li>
      {/each}
    </ul>
  {/if}

  <form method="POST" class="flex flex-col gap-4" use:enhance>
    <div class="flex gap-4">
      <div class="flex flex-col">
        <label for="first-name" class="ml-3">First Name</label>
        <input type="text" name="firstName" id="first-name" />
      </div>

      <div class="flex flex-col">
        <label for="last-name" class="ml-3">Last Name</label>
        <input type="text" name="lastName" id="last-name" />
      </div>
    </div>

    <div class="flex flex-col">
      <label for="email" class="ml-3">Email Address</label>
      <input type="email" name="email" id="email" />
    </div>

    <div class="flex flex-col">
      <label for="password" class="ml-3">Password</label>
      <input type="password" name="password" id="password" />
    </div>

    <button
      type="submit"
      class="bg-blue text-white py-3 rounded-md border-2 border-blue my-4"
    >
      Create Account
    </button>
  </form>

  <p class="text-center my-6 text-gray-600">
    Already have an account? <a href="/login" class="text-blue-500">Log in</a>
  </p>
</div>

<style>
  input {
    @apply border-2 border-gray-200 rounded-md py-2 px-3 my-1;
  }
</style>

<script>
  export let data;
</script>

<div class="w-full mx-4">
  <div>
    <h1 class="text-4xl mb-1 dark:text-gray mt-2 font-bold">My Details</h1>
  </div>

  <form action="/account/myDetails" method="POST">

    <div class="my-8">
      <h1 class="text-2xl mb-1 dark:dark:text-gray-100 mt-2 font-semibold">Personal Information</h1>
      <hr class="dark:border-gray-500"/>
  
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label class="block dark:text-gray-300" for="first-name">First Name</label>
          <input class="dark:bg-lightbg dark:border-none dark:focus:bg-lightbg w-full" type="text" name="firstName" id="first-name" value="{data.user.firstName}"/>
        </div>
        <div>
          <label class="block dark:text-gray-300" for="last-name">Last Name</label>
          <input class="dark:bg-lightbg dark:border-none dark:focus:bg-lightbg w-full" type="text" name="lastName" id="last-name" value="{data.user.lastName}"/>
        </div>
      </div>
  
      <div class="mt-4">
        <label class="block dark:text-gray-300" for="phone">Phone Number</label>
        <input class="dark:bg-lightbg dark:border-none dark:focus:bg-lightbg w-full" type="text" name="phone" id="phone" value="{data.user.phoneNumber}"/>
      </div>
    </div>
  
    <div class="my-8">
      <h1 class="text-2xl mb-1 dark:text-gray-100 mt-2 font-semibold">E-mail Details</h1>
      <hr class="dark:border-gray-500 mb-4"/>
  
      <div class="mt-4">
        <label class="block dark:text-gray-300" for="email">Email Address</label>
        <input class="dark:bg-lightbg dark:border-none dark:focus:bg-lightbg w-full" type="email" name="email" id="email" value="{data.user.email}"/>
      </div>
  
      <div class="mt-4 grid grid-cols-1 gap-2">
        <div>
          <input type="checkbox" id="newsletters" name="newsletters">
          <label class="ml-2 dark:text-gray-300" for="newsletters">Opt in to receiving newsletters</label>
        </div>
        <div>
          <input type="checkbox" id="important" name="important">
          <label class="ml-2 dark:text-gray-300" for="important">Opt in to receiving important information</label>
        </div>
      </div>
    </div>
  
    <div class="my-8">
      <h1 class="text-2xl mb-1 dark:text-gray-100 mt-2 font-semibold">Preferences</h1>
      <hr class="dark:border-gray-500"/>
  
      <div class="mt-4">
        <label class="relative inline-flex items-center mb-5 cursor-pointer">
          <input type="checkbox" name="darkMode" class="sr-only peer" bind:checked={data.user.darkMode}>
          <div class="w-11 h-6 bg-gray-300 peer-checked:bg-gray-500 peer-checked:after:bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-500 peer-checked:dark:bg-gray-700  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ml-4 dark:text-gray-300">Toggle Light Mode</span>
        </label>
      </div>
    </div>

    <div class="flex justify-start">
    <button
      type="submit"
      class="bg-blue text-white py-3 px-8 rounded-full border-2 border-none hover:bg-lightbg"
    >
      Save Changes
    </button>
  </div>
  
  </form>
</div>

<style>
    input {
      @apply border-2 border-gray-400 py-2 px-5 my-1 rounded-full focus:outline-none focus:shadow-outline focus:bg-gray-100;
    }
</style>

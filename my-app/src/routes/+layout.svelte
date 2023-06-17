<script>
  import "../app.css";
  import { onMount, onDestroy } from 'svelte';
  import { page } from "$app/stores";

  let darkMode;

  // Whenever the session changes, update the theme
  $: {
    darkMode = $page.data.user?.darkMode ?? true;
  }

  onMount(() => {
    function setTheme() {
      if (darkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
    // Whenever the session changes, update the theme
    setTheme();

    // Cleanup function when the component unmounts
    return () => {
      document.body.classList.remove('dark');
    }
  });

</script>

<header class="flex justify-between py-5 px-10 max-w-screen-2xl mx-auto items-center dark:bg-navbg dark:text-white relative z-20">
  <!-- Logo -->
  <div class="flex justify-start">
    <a href="/" class="text-xl hover-fade">
      <span class="font-bold">Alpha</span>Forex
    </a>
  </div>

  <!-- Navigation items -->
  <div class="flex justify-center flex-grow">
    <a href="/news" class="mx-3 hover-fade">News</a>
    <a href="/about" class="mx-3 hover-fade">About Us</a>
    <a href="/pricing" class="mx-3 hover-fade">Pricing</a>
    {#if $page.data.user}
      <a href="/account/myStocks" class="mx-3 hover-fade">My Stocks</a>
      <a href="/account" class="mx-3 hover-fade">Account</a>
    {/if}
  </div>

  <!-- Login / Sign up or Log out -->
  <div class="flex justify-end">
    {#if $page.data.user}
      <form method="POST" action="/logout">
        <button class="hover-fade" type="submit">Log Out</button>
      </form>
    {:else}
      <a href="/login" class="mx-2 hover-fade">Login</a>
      <a href="/create-account" class="mx-2 hover-fade">Sign Up</a>
    {/if}
  </div>
</header>


<div class="dark:bg-navbg dark:text-white dark:caret-blue relative z-10 min-h-screen">
  <div class="max-w-screen-2xl mx-auto py-8 px-10">
    <slot />
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
</style>

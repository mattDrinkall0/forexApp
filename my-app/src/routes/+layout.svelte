<script>
  import "../app.css";
  import { page } from "$app/stores";
</script>

<header
  class="flex justify-between py-5 px-10 max-w-screen-2xl mx-auto items-center dark:bg-navbg dark:text-white relative z-20"
>
  <a href="/" class="text-xl hover-fade">
    <span class="font-bold">Alpha</span>Forex
  </a>

  <nav class="flex gap-10">
    {#if $page.data.user}
    <a href="/mystocks" class="hover-fade">My Stocks</a>
    <a href="/news" class="hover-fade">News</a>
    <a href="/about" class="hover-fade">About Us</a>
    <a href="/pricing" class="hover-fade">Pricing</a>
    <a href="/account" class="hover-fade">Account</a>

    <form method="POST" action="/logout">
      <button class="hover-fade" type="submit">Log Out</button>
    </form>
    {:else}
      <a href="/news" class="hover-fade">News</a>
      <a href="/about" class="hover-fade">About Us</a>
      <a href="/pricing" class="hover-fade">Pricing</a>
      <a href="/login" class="hover-fade">Login</a>
      <a href="/create-account" class="hover-fade">Sign Up</a>
    {/if}
  </nav>
</header>

<div class="dark:bg-bodybg dark:text-white dark:caret-blue relative z-10 min-h-screen">
  <div class="max-w-screen-2xl mx-auto py-8 px-10">
    <slot />
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
</style>

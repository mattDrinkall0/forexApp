<script>
  import "../app.css";
  import { page } from "$app/stores";
</script>

<header
  class="flex justify-between py-8 px-10 max-w-screen-2xl mx-auto items-center"
>
  <a href="/" class="text-xl">
    <span class="font-bold">Alpha</span>Forex
  </a>

  <nav class="flex gap-10">
    {#if $page.data.user}
    <a href="/mystocks">My Stocks</a>
    <a href="/news">News</a>
    <a href="/about">About Us</a>
    <a href="/pricing">Pricing</a>
    <a href="/account">Account</a>

    <form method="POST" action="/logout">
      <button type="submit">Log Out</button>
    </form>
    {:else}
      <a href="/news">News</a>
      <a href="/about">About Us</a>
      <a href="/pricing">Pricing</a>
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>
    {/if}
  </nav>
</header>

<main class="mx-auto max-w-6xl">
  <slot />
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
</style>

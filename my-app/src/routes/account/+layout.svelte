<script>
  import { page } from "$app/stores";
  import HeadCircle from "$lib/assets/HeadCircle.svelte"
  import Stock from "$lib/assets/Stock.svelte"
  import Key from "$lib/assets/Key.svelte"
  import Card from "$lib/assets/Card.svelte"
  import Calendar from "$lib/assets/Calendar.svelte"

  let nav = [
    { url: "myDetails", name: "My Details", icon: HeadCircle},
    { url: "myStocks", name: "My Stocks", icon: Stock },
    { url: "apiKey", name: "API Key", icon: Key },
    { url: "paymentMethod", name: "Payment Methods", disabled: true, icon: Card },
    { url: "subscription", name: "Subscription", disabled: true, icon: Calendar },
  ]

  function navigate(link, event) {
    if(link.disabled){
      event.preventDefault();
    }
  }
</script>

<style>
  .disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>

<div class="flex gap-6">
  <div class="flex flex-col min-w-[14rem] dark:bg-medbg">
    {#each nav as link}
      <a
        href="/account/{link.url}"
        on:click={(event) => navigate(link, event)}
        class="{link.disabled ? 'disabled' : $page.url.pathname.includes(`/${link.url}`) 
          ? 'before:bg-blue before:w-1.5 before:h-9 before:top-1.5 before:absolute before:-left-3 before:rounded-full dark:bg-blue bg-gray-100' 
          : 'dark:hover:bg-lightbg hover:bg-blue'} relative py-4 px-4 flex flex-row items-center gap-2">
            <span class="w-6">
              {#if link.icon}
                <svelte:component this={link.icon} />
              {/if}
            </span>
          {link.name}</a
      >
    {/each}
  </div>

  <div class="w-full">
    <slot />
  </div>
</div>

<script>
  import { page } from "$app/stores";

  let nav = [
    { url: "myDetails", name: "My Details" },
      { url: "myStocks", name: "My Stocks" },
      { url: "apiKey", name: "API Key" },
      { url: "paymentMethod", name: "Payment Methods" },
      { url: "subscription", name: "Subscription" },
  ]
</script>

<div class="flex gap-6">
  <div class="flex flex-col min-w-[14rem] dark:bg-medbg">
    {#each nav as link}
      <a
        href="/account/{link.url}"
        class="{$page.url.pathname.includes(`/${link.url}`)
          ? 'before:bg-blue before:w-1.5 before:h-9 before:top-1.5 before:absolute before:-left-3 before:rounded-full dark:bg-blue bg-gray-100'
          : 'dark:hover:bg-lightbg hover:bg-blue'} relative py-4 px-4">{link.name}</a
      >
    {/each}
  </div>

  <div class="w-full">
    <slot />
  </div>
</div>

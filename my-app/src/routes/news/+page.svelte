<script>
    import {page} from '$app/stores';
    import {formatDate, formatTime} from '$lib/formatDate';


    export let data;
</script>

<div class="text-center">
    <h1 class="text-4xl mb-20 dark:text-gray mt-2 font-bold">Latest News Feed</h1>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {#each data.news as article (article.url)}

      {#if (article.banner_image) && (article.summary) && (article.source) && (article.time_published) && (article.title) && (article.url) && (article.ticker_sentiment)}
      <a href={article.url} class="block bg-white dark:bg-medbg dark:border-none border shadow-md transform transition-all duration-200 hover:scale-105 flex flex-col mb-10">
        <img src={article.banner_image} alt="{article.title}" class="w-full h-48 object-cover mb-4"/>
        <h2 class="text-xl font-bold mb-2 line-clamp-2 px-6">{article.title}</h2>
        <p class="text-sm mb-2 px-6">{article.source} - {formatTime(article.time_published)} {formatDate(article.time_published)}</p>
        <p class="text-base px-6 flex-grow">{article.summary}</p>

        <div class="px-6">
          {#if $page.data.user }
              <h4 class="font-bold mt-4">Stocks Effected</h4>
              <hr class="mb-4">
  
              {#if article.ticker_sentiment.length == 0}
                  <p>No Stocks Effected</p>
              {/if}
  
              {#each article.ticker_sentiment as stock}
                  <p>{stock.ticker} - {stock.ticker_sentiment_label}</p>
              {/each}
          {/if}
          </div>
        <span class="block mt-4 hover:underline px-6 pb-2 font-bold self-start">Read More</span>
      </a>
      {/if}
    {/each}
  </div>

<script>
    export let data;
    import { goto } from '$app/navigation';
    import { page } from "$app/stores";
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let search = '';
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'];
    let results = [];

    $: {
    if (search.length > 0) {
      const lowerCaseSearch = search.toLowerCase();
      results = data.stocks.filter(stock => 
        stock.name.toLowerCase().startsWith(lowerCaseSearch) ||
        stock.symbol.toLowerCase().startsWith(lowerCaseSearch)
      ).slice(0, 5);
    } else {
      results = [];
    }
}

  const selectSymbol = (symbol) => {
    goto(`/stock/${symbol}`);
  };

  
  // Reactive background 
  let svg;

  const colors = {
  dark: {
    solidPath: '#00FF00', // white for dark mode
    dashedPath: '#dddddd', // light grey for dark mode
    endPoint: '#2196f3' // white for dark mode
  },
  light: {
    solidPath: '#2196f3', // black for light mode
    dashedPath: '#aaaaaa', // dark grey for light mode
    endPoint: '#000000' // black for light mode
  }
};

  onMount(() => {

    const width = window.innerWidth;
    const height = window.innerHeight-100;

    const points = 150  ;  // Reduce number of points
    const volatility = 60;  // Reduce volatility

    svg = d3.select('#svg')
      .attr('width', width)
      .attr('height', height);

    const lineData = d3.range(points).map((_, i) => ({
      x: i * (width / (points - 1)),
      y: height - (height / (points - 1)) * i + (Math.random() - 0.5) * volatility
    }));

    const line = d3.line()
      .x(d => d.x)
      .y(d => d.y);
    
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';

    const solidPath = svg.append('path')
      .datum(lineData)
      .attr('d', line)
      .attr('stroke', colors[theme].solidPath)
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    const dashedPath = svg.append('line')
      .attr('x1', 0)
      .attr('y1', height)
      .attr('x2', width)
      .attr('y2', 0)
      .attr('stroke', colors[theme].dashedPath)
      .attr('stroke-dasharray', '5,5');

    const yScale = d3.scaleLinear()
      .domain([0, width])
      .range([height, 0]);

    // Append a line for the end point
    const endPoint = svg.append('line')
      .attr('stroke', colors[theme].endPoint)
      .attr('stroke-width', '2');

    svg.on('mousemove', event => {
      const mouseX = d3.pointer(event)[0];

      solidPath.attr('clip-path', `url(#clip-left-${mouseX})`);
      dashedPath.attr('x1', mouseX).attr('y1', yScale(mouseX));

      svg.select(`#clip-left-${mouseX}`).remove();

      svg.append('clipPath')
        .attr('id', `clip-left-${mouseX}`)
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', mouseX)
        .attr('height', height);

      // Update the position and dimensions of the line
      endPoint.attr('x1', mouseX).attr('y1', yScale(mouseX) - 30).attr('x2', mouseX).attr('y2', yScale(mouseX) + 30);
    });
});

</script>
  
  <div class="text-center my-32">
  
    <h1 class="text-6xl font-bold max-w-3xl mx-auto">
      Make Money Smarter
    </h1>

      <div class="flex flex-col items-center justify-center my-16 relative z-10">
        <input class="
        w-1/3 px-5 py-3 rounded-full border-2 border-black focus:outline-none focus:shadow-outline 
        dark:bg-lightbg
        dark:border-none
        focus:rounded-bl-none focus:rounded-br-none focus:rounded-tl-md focus:rounded-tr-md" 
        type="text" placeholder="Enter Stock..."
        bind:value={search} />

        {#if search !== ''}
            <div class= "w-1/3 bg-white text-black shadow-lg max-h-60 rounded-bl-lg rounded-br-lg overflow-auto cursor-pointer dark:bg-medbg
            dark:border-none dark:text-white">
                {#if results.length === 0}
                    <div class="px-4 py-2">No results found</div>
                {:else}
                    {#each results as result, i}
                        <div class="border-t border-gray dark:border-white first:border-t-0 px-4 py-2 hover:bg-blue text-left" data-result={i} 
                        on:click={() => selectSymbol(result.symbol)}>
                            <p>{ result.name} - <i>{ result.symbol }</i></p>
                        </div>
                    {/each}
                {/if}
            </div>
        {/if}

        {#if !$page.data.user}
        <p class="my-8">To Access Predictions you must be <a class="text-blue" href="/login">logged in</a></p>
        {/if}
      </div>

    <div class="fixed bottom-0 right-0 p-4 z-10">
      <a href="/help" class="text-black rounded-full px-4 py-2 dark:text-white">Help</a>
      
    </div>

    <svg class="absolute inset-0 max-w-full min-h-full" id="svg" />
  </div>
  
<script>
    import { onMount } from "svelte";
    import { Line } from "svelte-chartjs";
    import Chart from "chart.js/auto";
    import { formatLabel } from "$lib/formatDate";
  
    export let data;

    let value = 0.2; // Input value, set it to your variable
    let sentimentValue = -0.12;

    $: position = ((value + 1) * 50) + '%';
    $: sentimentPosition = ((sentimentValue + 1) * 50) + '%';

    let sliceVal = 140;
    const sliceOptions = {
      "1D": 15,
      "1W": 30,
      "1M": 50,
      "3M": 70,
      "6M": 100,
      "1Y": 140,
      "Max": data.weekPrices.length,
    }

    const originalNames = data.weekNames;
    const originalPrices = data.weekPrices;

    let reversedWeekNames = data.weekNames.slice().reverse();
    let reversedWeekPrices = data.weekPrices.slice().reverse();

    let before = data.weekPrices[1];
    let after = data.weekPrices[0];
    let percentage = ((after - before) / before) * 100;
    $: sign = percentage < 0 ? '' : '+';
    $: signColor = percentage < 0 ? '#cc0000' : '#00FF00';

    let chartData = {
    labels: reversedWeekNames,
    datasets: [
      {
        data: reversedWeekPrices,
        fill: true,
        borderColor: "#2196f3",
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, '#6AB8F7');
          gradient.addColorStop(1, 'rgba(106, 184, 247, 0)'); // Transparent color
          return gradient;
        },
        tension: 0,
      },
    ],
  };

  let chart;

  onMount(() => {
  const ctx = document.getElementById("chart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: {
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        tooltip: {
          backgroundColor: "#2196f3",
          displayColors: false,
          intersect: false, // Enable tooltips over all points
          callbacks: {
            // Prints the date as the title
            title: (tooltipItems) => { 
              return formatLabel(tooltipItems[0].label); 
            }, 
            label: (tooltipItem) => {
              // Return the label for the tooltip
              return `$${tooltipItem.parsed.y.toFixed(2)}`;
            },
          },
        },
      },
      responsive: true,
      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: false,
          position: "right",
        },
      },
    },
  });
});

function updateChart(newSliceVal) {
  let chartNames = originalNames.slice(0, newSliceVal).slice().reverse();
  let chartPrices = originalPrices.slice(0, newSliceVal).slice().reverse();

  chart.data.labels = chartNames;
  chart.data.datasets[0].data = chartPrices;
  chart.update();
}

  </script>

<div class="text-left">
    <h1 class="text-4xl my-2 font-bold">{data.name}</h1>
    <p> <b>&#903;</b> {data.symbol}</p>
</div>

<div class="flex gap-8 text-4xl my-2">
  <h1>${data.weekPrices[0]}</h1>
  <h1 style="color:{signColor}">{sign}{percentage.toFixed(2)}%</h1>
</div>

<div class="flex w-2/3 justify-between gap-2 pr-8">
  {#each Object.keys(sliceOptions) as option (option)}
    <button 
      class="px-4 w-full py-2 opacity-50 dark:border-none border bg-gray-300 hover:bg-gray-400 dark:bg-medbg dark:hover:bg-lightbg" 
      on:click={() => {sliceVal = sliceOptions[option]; updateChart(sliceOptions[option]);}}>
      {option}
    </button>
  {/each}
</div>

<div class="flex w-full">
    <div class="w-2/3">
      <canvas id="chart"></canvas>
    </div>

    <div class="flex-grow ml-4 px-6">
      <h1 class="text-2xl mb-1 dark:dark:text-gray-100 font-semibold">Our Predictions</h1>
      <hr>

      <div class="mt-4">
      <h1>Weekly Growth Change</h1>
       <div class="flex items-center">
           <span>-1</span>
           <div class="slider mx-2">
             <div class="pointer" style="left: {position};"></div>
             <div class="value" style="left: {position};">{value.toFixed(2)}</div>
           </div>
           <span>1</span>
         </div>
      </div>

      <div class="mt-8 mb-16">
        <h1>Weekly News Sentiment</h1>
         <div class="flex items-center">
             <span>-1</span>
             <div class="slider mx-2">
               <div class="pointer" style="left: {sentimentPosition};"></div>
               <div class="value" style="left: {sentimentPosition};">{sentimentValue.toFixed(2)}</div>
             </div>
             <span>1</span>
           </div>
        </div>

        <h1 class="text-2xl mb-1 dark:dark:text-gray-100 font-semibold">Weekly Stock Data</h1>
        <hr>
        <div class="grid grid-cols-2 my-4 gap-4">
          <div class="w-full flex justify-between">
            <p>Open</p>
            <p>-</p>
            <p>{parseFloat(data.open).toFixed(2)}</p>
          </div>

          <div class="w-full flex justify-between">
            <p>Close</p>
            <p>-</p>
            <p>{parseFloat(data.close).toFixed(2)}</p>
          </div>

          <div class="w-full flex justify-between">
            <p>High</p>
            <p>-</p>
            <p>{parseFloat(data.high).toFixed(2)}</p>
          </div>

          <div class="w-full flex justify-between">
            <p>Low</p>
            <p>-</p>
            <p>{parseFloat(data.low).toFixed(2)}</p>
          </div>

          <div class="w-full flex justify-between col-span-2">
            <p>Volume</p>
            <p>-</p>
            <p>{data.volume}</p>
          </div>
        </div>
    </div>
  </div>

  <div>
    <h1 class="text-2xl mb-1 mt-8 dark:dark:text-gray-100 font-semibold">Related News</h1>
  </div>
  

  <style>
    .slider {
    width: 100%;
    height: 10px;
    background: linear-gradient(90deg, #FF0000, #808080, #00FF00);
    position: relative;
    border-radius: 10px;
    }
    .pointer {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid;
        color: #6AB8F7;
        top: 10px;
    }
    .value {
        position: absolute;
        top: 30px;
    }
  </style>
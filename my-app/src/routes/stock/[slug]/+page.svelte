<script>
    import { onMount } from "svelte";
    import { Line } from "svelte-chartjs";
    import Chart from "chart.js/auto";
  
    export let data;

    let value = 0.2; // Input value, set it to your variable

    // computed color and position based on value
    $: color = value < 0 ? 'red' : value > 0 ? 'green' : 'gray';
    $: position = ((value + 1) * 50) + '%';

    let reversedWeekNames = data.weekNames.slice().reverse();
    let reversedWeekPrices = data.weekPrices.slice().reverse();

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
        tension: 0.1,
      },
    ],
  };

  onMount(() => {
    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
          tooltip: {
            enabled: false,
          },
        },
        responsive: true,
        
        scales: {
            x: {
            display: false,
            
          },
          y: {
            beginAtZero: true,
            position: "right",
          },
        },
      },
    });
  });
  </script>

<div class="text-left mb-6">
    <h1 class="text-4xl my-2 font-bold">{data.name}</h1>
    <p class="text-gray-200"> &#903; {data.symbol}</p>
</div>

<h1 class="text-4xl dark:text-gray my-2">${data.weekPrices[0]}</h1>

<div class="flex w-full">
    <div class="w-2/3">
      <canvas id="chart"></canvas>
    </div>

    <div class="flex-grow ml-4 px-6">
      <h1 class="text-2xl mb-1 dark:dark:text-gray-100 font-semibold">Our Predictions</h1>
      <hr>

       <div class="flex items-center">
           <span>-1</span>
           <div class="slider mx-2">
             <div class="pointer" style="left: {position};"></div>
             <div class="value" style="left: {position};">{value.toFixed(2)}</div>
           </div>
           <span>1</span>
         </div>
    </div>
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
<script>
    import { onMount } from "svelte";
    import { Line } from "svelte-chartjs";
    import Chart from "chart.js/auto";
  
    export let data;

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

<div class="text-left">
    <h1 class="text-4xl dark:text-gray my-2 font-bold">{data.name}</h1>
    <p>{data.symbol}</p>
</div>

<h1 class="text-4xl dark:text-gray my-2">${data.weekPrices[0]}</h1>

<div class="left-0 absolute w-2/3">
    <canvas id="chart"></canvas>
</div>
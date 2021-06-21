function mousePressed3() {
  console.log(phases.length);
  console.log(TheX_Axis.length);

  var ctx = document.getElementById("Phase").getContext("2d");
  var Phase = new Chart(ctx, {
    type: "line",
    data: {
      labels: TheX_Axis,
      datasets: [
        {
          label: "# of Votes",
          data: phases,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      pointRadius: 0,
    }
  });
}

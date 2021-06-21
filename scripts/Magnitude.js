function mousePressed2() {
  console.log(Distances.length);
  console.log(TheX_Axis.length);

  const ctx = document.getElementById("Magnitude").getContext("2d");
  const Magnitude = new Chart(ctx, {
    type: "line",
    data: {
      labels: TheX_Axis,
      datasets: [
        {
          label: "Magnitude",
          data: Distances,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor:"rgba(255, 99, 132, 1)",
          borderWidth: 1,
          tension: 0.1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
      },
      pointRadius: 0,
    }
  });
}

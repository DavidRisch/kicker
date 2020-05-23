var winLoosePieCtx = document.getElementById("winLoosePie").getContext("2d");
var winLoosePie = new Chart(winLoosePieCtx, {
  type: "pie",
  data: {
    labels: ["Wins", "Looses"],
    datasets: [
      {
        data: [90, 20],
        borderWidth: 0,
        backgroundColor: ["#31bebeff", "#12141eff"],
      },
    ],
  },
  options: {
    legend: {
      display: true,
      onClick: (e) => e.stopPropagation(),
      labels: { fontColor: "#ffffff", fontsize: 20 },
    },
  },
});

var eloChartCtx = document.getElementById("eloChart").getContext("2d");
var eloChart = new Chart(eloChartCtx, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
    ],
    datasets: [
      {
        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        label: "Elo",
        borderColor: "#31bebeff",
        fill: false,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: false,
      text: "Elo over time",
      fontColor: "#ffffff",
    },
  },
});
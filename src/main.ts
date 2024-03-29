import "./style.css";
import Chart from "./Chart";

new Chart({
  selector: "#app",
  type: "pie",
  size: { width: 500, height: 500 },
  strokeWidth: 2,
  labels: ["Java", "PHP", "Ruby", "Rust", "Go"],
  datasets: [10, 50, 12, 25, 15],
});

new Chart({
  selector: "#app",
  type: "basic",
  size: { width: 500, height: 500 },
  strokeWidth: 2,
  labels: ["Java", "PHP", "Ruby", "Rust", "Go"],
  datasets: [
    {
      name: "Developer 1",
      data: [10, 50, 20, 25, 15],
      strokeColor: "rgb(0, 143, 251)",
      fillColor: "rgba(0, 143, 251, 0.2)",
    },
    {
      name: "Developer 2",
      data: [10, 20, 30, 40, 50],
      strokeColor: "rgb(0, 227, 150)",
      fillColor: "rgba(0, 227, 150, 0.2)",
    },
    {
      name: "Developer 3",
      data: [25, 40, 15, 55, 15],
      strokeColor: "rgb(255, 99, 132)",
      fillColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
});

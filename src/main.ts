import "./style.css";
// import Chart from "./Chart";
import BasicRadarChart from "./chart/BasicRadarChart";
import PieRadarChart from "./chart/PieRadarChart";

const chart = new PieRadarChart({
  selector: "#app",
  size: { width: 500, height: 500 },
  strokeWidth: 2,
  labels: ["Javascript", "PHP", "Ruby", "Rust", "Go"],
  datasets: [
    {
      name: "Developer 1",
      data: [10, 50, 20, 20, 15],
      strokeColor: "rgb(0, 143, 251)",
      fillColor: "rgba(0, 143, 251, 0.2)",
    },
    {
      name: "Developer 1",
      data: [10, 20, 30, 40, 50],
      strokeColor: "rgb(0, 227, 150)",
      fillColor: "rgba(0, 227, 150, 0.2)",
    },
    {
      name: "Developer 2",
      data: [25, 40, 15, 55, 15],
      strokeColor: "rgb(255, 99, 132)",
      fillColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
});

// const chart = new BasicRadarChart({
//   selector: "#app",
//   size: { width: 500, height: 500 },
//   strokeWidth: 2,
//   labels: ["Javascript", "PHP", "Ruby", "Rust", "Go"],
//   datasets: [
//     {
//       name: "Developer 1",
//       data: [10, 50, 20, 20, 15],
//       strokeColor: "rgb(0, 143, 251)",
//       fillColor: "rgba(0, 143, 251, 0.2)",
//     },
//     {
//       name: "Developer 1",
//       data: [10, 20, 30, 40, 50],
//       strokeColor: "rgb(0, 227, 150)",
//       fillColor: "rgba(0, 227, 150, 0.2)",
//     },
//     {
//       name: "Developer 2",
//       data: [25, 40, 15, 55, 15],
//       strokeColor: "rgb(255, 99, 132)",
//       fillColor: "rgba(255, 99, 132, 0.2)",
//     },
//   ],
// });

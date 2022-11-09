import "./style.css";
import Chart from "./Chart";

const chart = new Chart({
  selector: "#app",
  size: { width: 500, height: 500 },
  // labels: ["Javascript", "PHP", "Ruby"],
  // labels: ["Javascript", "PHP", "Ruby", "Rust"],
  labels: ["Javascript", "PHP", "Ruby", "Rust", "Go"],
  // labels: ["Javascript", "PHP", "Ruby", "Rust", "Go", "123"],
  // labels: ["Javascript", "PHP", "Ruby", "Rust", "Go", "123", "456"],
  // labels: ["Javascript", "PHP", "Ruby", "Rust", "Go", "123", "456", "789"],
  // labels: ["Javascript", "PHP", "Ruby", "Rust", "Go", "123", "456", "789", "123"],
  datasets: [
    // { name: "Developer 1", data: [10, 50, 20, 20, 15] },
    // { name: "Developer 1", data: [10, 20, 30, 40, 50] },
    // { name: "Developer 2", data: [25, 40, 15, 55, 15] },
    //  --
    // { name: "Developer 2", data: [25, 40, 15] },
    // { name: "Developer 2", data: [25, 40, 15, 55] },
    { name: "Developer 2", data: [25, 40, 15, 55, 15] },
    // { name: "Developer 2", data: [25, 40, 15, 55, 15, 60] },
    // { name: "Developer 2", data: [25, 40, 15, 55, 15, 60, 35] },
    // { name: "Developer 2", data: [25, 40, 15, 55, 15, 60, 35, 123] },
    // { name: "Developer 2", data: [25, 40, 15, 55, 15, 60, 35, 123, 11] },
  ],
});

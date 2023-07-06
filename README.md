# Radar Chart

## Description

Radar chart is a library (soon) that allows you to create radar charts based on your datasets. I build this because I needed a radar chart for a project and I didn't find any library that was easy for me. So I decided to build my own. This was built using Javascript, Typescript and Canvas for rendering the chart.

## How to use

<img src="https://github.com/Erik3010/radar-chart/blob/master/preview/basic.png?raw=true" alt="Basic Radar chart" width="50%" height="50%">

There are two types of charts in this library. There are Basic and Pie chart.

### Basic Chart

<img src="https://github.com/Erik3010/radar-chart/blob/master/preview/pie.png?raw=true" alt="Pie Radar chart" width="50%" height="50%">

It is a radar chart that has a line that connects the points. This is the default chart.

```javascript
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
```

### Pie Chart

It is a radar chart that the largest value is the outer part of the chart and the smallest value is the center of the chart.

```javascript
new Chart({
  selector: "#app",
  type: "pie",
  size: { width: 500, height: 500 },
  strokeWidth: 2,
  labels: ["Java", "PHP", "Ruby", "Rust", "Go"],
  datasets: [10, 50, 12, 25, 15],
});
```

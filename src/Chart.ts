import { ChartOption } from "./types/ChartOption";
import { Coordinate } from "./types/Coordinate";
import { createElement, angleToRadian } from "./utils";

class Chart {
  option: ChartOption;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  container: HTMLElement;

  chartDatasetCount = 5;
  radius: number = 0;

  padding = 50;
  angle = 0;
  startAngle = 0;
  side = 0;

  constructor(option: ChartOption) {
    this.option = option;

    this.container = document.querySelector(this.option.selector)!;

    this.canvas = createElement("canvas", this.option.size);
    this.ctx = this.canvas.getContext("2d")!;

    this.container.appendChild(this.canvas);

    this.radius =
      Math.min(this.option.size.width, this.option.size.height) / 2 -
      this.padding;

    this.side = this.option.labels.length;
    this.angle = angleToRadian(360 / this.side);
    this.startAngle = angleToRadian(360 / this.side - 90);
    // 30, 0, 55, 30, 40, 0, 10
    // 30, 0, -18, 30, 40, 0, 10

    this.render();
  }
  draw() {
    for (let i = 1; i <= this.chartDatasetCount; i++) {
      this.drawPolygon((this.radius / this.chartDatasetCount) * i);
    }

    for (let i = 0; i <= this.side; i++) {
      const { x, y } = this.getPointByAngle(this.angle * i, this.radius);

      this.ctx.beginPath();
      this.ctx.moveTo(this.centerPoint.x, this.centerPoint.y);
      this.ctx.lineTo(x + this.centerPoint.x, y + this.centerPoint.y);
      this.ctx.closePath();
      this.ctx.strokeStyle = "#d7d7d7";
      this.ctx.stroke();

      console.log(x, y);
    }

    const mergedData = this.option.datasets.reduce<number[]>(
      (total, data) => [...total, ...data.data],
      []
    );
    const max = Math.max(...mergedData);

    for (const dataset of this.option.datasets) {
      const step = this.radius / max;

      this.ctx.beginPath();
      for (const [index, data] of dataset.data.entries()) {
        const radius = data * step;

        const { x, y } = this.getPointByAngle(this.angle * index, radius);

        this.ctx.lineTo(x + this.centerPoint.x, y + this.centerPoint.y);
      }
      this.ctx.closePath();
      this.ctx.fillStyle = "rgba(0,143,251,0.2)";
      this.ctx.strokeStyle = "rgb(0,143,251)";
      this.ctx.fill();
      this.ctx.stroke();

      for (const [index, data] of dataset.data.entries()) {
        const radius = data * step;
        const { x, y } = this.getPointByAngle(this.angle * index, radius);

        this.ctx.beginPath();
        this.ctx.arc(
          x + this.centerPoint.x,
          y + this.centerPoint.y,
          5,
          0,
          2 * Math.PI
        );
        this.ctx.fillStyle = "rgb(0,143,251)";
        this.ctx.strokeStyle = "#fff";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }
  drawPolygon(radius: number) {
    // const side = 7;
    // -30, 0, 18, 30, -12,
    // -30, 0, -55, -30, -12,

    this.ctx.beginPath();
    for (let i = 1; i <= this.side; i++) {
      const { x, y } = this.getPointByAngle(this.angle * i, radius);

      this.ctx.lineTo(x + this.centerPoint.x, y + this.centerPoint.y);
    }
    this.ctx.closePath();
    this.ctx.strokeStyle = "#d7d7d7";
    this.ctx.stroke();
  }
  get centerPoint(): Coordinate {
    const { width, height } = this.option.size;
    return { x: width / 2, y: height / 2 };
  }
  getPointByAngle(angle: number, radius: number) {
    return {
      x: Math.cos(angle + this.startAngle) * radius,
      y: Math.sin(angle + this.startAngle) * radius,
    };
  }
  render() {
    this.draw();
  }
}

export default Chart;

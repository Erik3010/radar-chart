import { ChartOption } from "../types/ChartOption";
import { Coordinate } from "../types/Coordinate";
import { createElement, angleToRadian, roundNumber } from "../utils";
import {
  LABEL_FONT_SIZE,
  LABEL_PADDING,
  CHART_PADDING,
  DOT_RADIUS,
} from "../constants";

class PieRadarChart {
  option: ChartOption;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  container: HTMLElement;

  chartDatasetCount = 5;
  radius: number = 0;

  padding = CHART_PADDING;
  angle = 0;
  startAngle = 0;
  side = 0;

  gridStrokeColor = "#d7d7d7";

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

    this.render();
  }
  drawGrid() {
    // draw polygon
    for (let i = 0; i < this.chartDatasetCount; i++) {
      this.drawPolygon((this.radius / this.chartDatasetCount) * (i + 1));
    }

    // draw line angle
    for (let i = 0; i < this.side; i++) {
      const label = this.option.labels[i];
      const { x, y } = this.getPointByAngle(this.angle * i, this.radius);

      this.ctx.beginPath();
      this.ctx.moveTo(this.centerPoint.x, this.centerPoint.y);
      this.ctx.lineTo(x + this.centerPoint.x, y + this.centerPoint.y);
      this.ctx.closePath();
      this.ctx.strokeStyle = this.gridStrokeColor;
      this.ctx.stroke();

      this.drawText({ x, y, text: label });
    }
  }
  drawText({ x, y, text }: Coordinate & { text: string }) {
    this.ctx.save();

    this.ctx.font = `${LABEL_FONT_SIZE}px Arial`;
    const { width } = this.ctx.measureText(text);

    const textMarginMap: Record<string, number> = {
      "-1": (width + LABEL_PADDING) * -1,
      "0": (width / 2) * -1,
      "1": LABEL_PADDING,
    };

    const position = {
      x: x + this.centerPoint.x + textMarginMap[Math.sign(x).toString()],
      y: y + this.centerPoint.y + LABEL_FONT_SIZE * Math.sign(y),
    };
    this.ctx.fillText(text, position.x, position.y);
    this.ctx.restore();
  }
  draw() {
    this.drawGrid();

    for (const dataset of this.option.datasets) {
      const step = this.radius / this.largestData;

      this.ctx.save();
      this.ctx.beginPath();
      for (const [index, data] of dataset.data.entries()) {
        const radius = data * step;
        const { x, y } = this.getPointByAngle(this.angle * index, radius);
        this.ctx.lineTo(x + this.centerPoint.x, y + this.centerPoint.y);
      }
      this.ctx.closePath();
      this.ctx.fillStyle = dataset.fillColor;
      this.ctx.strokeStyle = dataset.strokeColor;
      this.ctx.lineWidth = this.option.strokeWidth;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();

      for (const [index, data] of dataset.data.entries()) {
        const radius = data * step;
        this.drawDot({
          ...this.getPointByAngle(this.angle * index, radius),
          color: dataset.strokeColor,
        });
      }
    }
  }
  drawDot({ x, y, color }: Coordinate & { color: string }) {
    const position = {
      x: x + this.centerPoint.x,
      y: y + this.centerPoint.y,
    };

    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, DOT_RADIUS, 0, 2 * Math.PI);
    this.ctx.closePath();

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = "#fff";
    this.ctx.fill();
    this.ctx.stroke();
  }
  drawPolygon(radius: number) {
    this.ctx.beginPath();
    for (let i = 0; i < this.side; i++) {
      const { x, y } = this.getPointByAngle(this.angle * i, radius);
      this.ctx.lineTo(x + this.centerPoint.x, y + this.centerPoint.y);
    }
    this.ctx.closePath();

    this.ctx.strokeStyle = this.gridStrokeColor;
    this.ctx.stroke();
  }
  get largestData() {
    const datasets = this.option.datasets.reduce<number[]>(
      (acc, { data }) => [...acc, ...data],
      []
    );
    return Math.max(...datasets);
  }
  get centerPoint(): Coordinate {
    const { width, height } = this.option.size;
    return { x: width / 2, y: height / 2 };
  }
  getPointByAngle(angle: number, radius: number) {
    return {
      x: roundNumber(Math.cos(angle + this.startAngle) * radius, 5),
      y: roundNumber(Math.sin(angle + this.startAngle) * radius, 5),
    };
  }
  render() {
    this.draw();
  }
}

export default PieRadarChart;

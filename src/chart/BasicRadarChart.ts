import { Coordinate } from "../types/Coordinate";
import { toRadian } from "../utils/common";
import { LABEL_FONT_SIZE, LABEL_PADDING, POINT_RADIUS } from "../constants";
import RadarChart from "./RadarChart";
import { RadarChartOption } from "../types/RadarChartOption";

class BasicRadarChart extends RadarChart<"basic"> {
  constructor({ config, canvas }: RadarChartOption<"basic">) {
    super({ config, canvas });
    this.startAngle = toRadian(360 / this.side - 90);
  }
  drawGrid() {
    // draw polygon
    for (let i = 0; i < this.chartDatasetCount; i++) {
      this.drawPolygon((this.radius / this.chartDatasetCount) * (i + 1));
    }

    // draw line angle
    for (let i = 0; i < this.side; i++) {
      const label = this.config.labels[i];
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

    for (const dataset of this.datasets) {
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
      this.ctx.lineWidth = this.config.strokeWidth;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();

      for (const [index, data] of dataset.data.entries()) {
        const radius = data * step;
        this.drawPoint({
          ...this.getPointByAngle(this.angle * index, radius),
          color: dataset.strokeColor,
        });
      }
    }
  }
  drawPoint({ x, y, color }: Coordinate & { color: string }) {
    const position = {
      x: x + this.centerPoint.x,
      y: y + this.centerPoint.y,
    };

    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, POINT_RADIUS, 0, 2 * Math.PI);
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
    const datasets = this.datasets.reduce<number[]>(
      (acc, { data }) => [...acc, ...data],
      []
    );
    return Math.max(...datasets);
  }
  render() {
    this.draw();
  }
}

export default BasicRadarChart;

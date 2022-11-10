import { Coordinate } from "../types/Coordinate";
import { LABEL_FONT_SIZE, LABEL_PADDING, POINT_RADIUS } from "../constants";
import RadarChart from "./RadarChart";
import { RadarChartOption } from "../types/RadarChartOption";

class PieRadarChart extends RadarChart<"pie"> {
  constructor({ config, canvas }: RadarChartOption<"pie">) {
    super({ config, canvas });
  }
  drawGrid() {
    for (let i = 0; i < this.chartDatasetCount; i++) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.centerPoint.x,
        this.centerPoint.y,
        (this.radius / this.chartDatasetCount) * (i + 1),
        0,
        2 * Math.PI
      );
      this.ctx.strokeStyle = this.gridStrokeColor;
      this.ctx.closePath();
      this.ctx.stroke();
    }

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

    const step = this.radius / this.largestData;
    for (const [index, data] of this.datasets.entries()) {
      const radius = data * step;

      const startAngle = index * this.angle;
      const endAngle = startAngle + this.angle;

      this.ctx.beginPath();
      this.ctx.moveTo(this.centerPoint.x, this.centerPoint.y);
      this.ctx.arc(
        this.centerPoint.x,
        this.centerPoint.y,
        radius,
        startAngle,
        endAngle
      );
      this.ctx.closePath();
      // this.ctx.fillStyle = dataset.fillColor;
      // this.ctx.strokeStyle = dataset.strokeColor;
      this.ctx.fillStyle = "rgba(0, 143, 251, 0.2)";
      this.ctx.strokeStyle = "rgb(0, 143, 251)";
      this.ctx.lineWidth = this.config.strokeWidth;
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
  get largestData() {
    return Math.max(...this.datasets);
  }
  render() {
    this.draw();
  }
}

export default PieRadarChart;

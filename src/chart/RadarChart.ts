import { CHART_PADDING } from "../constants";
import { ChartOption, ChartType } from "../types/ChartOption";
import { Coordinate } from "../types/Coordinate";
import { RadarChartOption } from "../types/RadarChartOption";
import { toRadian, roundNumber } from "../utils/common";

abstract class RadarChart<T extends ChartType> {
  config: ChartOption;
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  datasets: RadarChartOption<T>["config"]["datasets"];

  chartDatasetCount = 5;
  radius = 0;

  padding = CHART_PADDING;
  angle = 0;
  side = 0;
  startAngle = 0;

  gridStrokeColor = "#d7d7d7";

  constructor({ config, canvas }: RadarChartOption<T>) {
    this.config = config;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.datasets = config.datasets;

    this.radius =
      Math.min(this.config.size.width, this.config.size.height) / 2 -
      this.padding;

    this.side = this.config.labels.length;
    this.angle = toRadian(360 / this.side);
  }
  get centerPoint(): Coordinate {
    const { width, height } = this.config.size;
    return { x: width / 2, y: height / 2 };
  }
  getPointByAngle(angle: number, radius: number) {
    return {
      x: roundNumber(Math.cos(angle + this.startAngle) * radius, 5),
      y: roundNumber(Math.sin(angle + this.startAngle) * radius, 5),
    };
  }
  drawGrid() {}
  draw() {}
  render() {}
}

export default RadarChart;

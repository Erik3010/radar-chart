import { ChartOption, ChartType } from "./types/ChartOption";
import { createElement } from "./utils/common";

import BasicRadarChart from "./chart/BasicRadarChart";
import PieRadarChart from "./chart/PieRadarChart";
import RadarChart from "./chart/RadarChart";
import { RadarChartOption } from "./types/RadarChartOption";

class Chart {
  option: ChartOption;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  container: HTMLElement;

  chart: RadarChart<ChartType>;

  constructor(option: ChartOption) {
    this.option = option;

    this.container = document.querySelector(this.option.selector)!;

    this.canvas = createElement("canvas", this.option.size);
    this.ctx = this.canvas.getContext("2d")!;

    const params = {
      canvas: this.canvas,
      config: this.option,
    };

    switch (this.option.type) {
      case "basic":
        this.chart = new BasicRadarChart(params as RadarChartOption<"basic">);
        break;
      case "pie":
        this.chart = new PieRadarChart(params as RadarChartOption<"pie">);
        break;
    }

    this.render();
    this.container.appendChild(this.canvas);
  }
  render() {
    this.chart.render();
  }
}

export default Chart;

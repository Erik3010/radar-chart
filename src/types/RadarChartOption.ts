import { ChartOption, ChartType } from "./ChartOption";

export interface RadarChartOption<T extends ChartType> {
  canvas: HTMLCanvasElement;
  config: ChartOption<T>;
}

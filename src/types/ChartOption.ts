export interface ChartOption {
  selector: string;
  size: Size;
  labels: string[];
  datasets: Dataset[];
  strokeWidth: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Dataset {
  name: string;
  data: number[];
  strokeColor: string;
  fillColor: string;
}

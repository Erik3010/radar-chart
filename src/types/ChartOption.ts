export interface ChartOption<T extends ChartType = ChartType> {
  selector: string;
  size: Size;
  labels: string[];
  // datasets: MultipleDataset | SingleDataset;
  // datasets: Dataset[];
  datasets: ChartDatasetRegistry[T];
  strokeWidth: number;
  type: ChartType;
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

export interface ChartDatasetRegistry {
  basic: BasicRadarDataset;
  pie: PieRadarDataset;
}

export type ChartType = keyof ChartDatasetRegistry;

export type BasicRadarDataset = Dataset[];
export type PieRadarDataset = number[];

// export type MultipleDataset = Dataset[];

// export type SingleDataset = number[];

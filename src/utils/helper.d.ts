// Define types
type CoordinateArray = [number, number][];
type ClickedHash = { [key: string]: number };

interface HeatmapData {
  x: number;
  y: number;
  value: number;
}

interface HashToHeatDataResult {
  heatmapData: HeatmapData[];
  minValue: number;
  maxValue: number;
}

// Define functions
export function convertToHashMap(coordinateArray: CoordinateArray): ClickedHash;

export function hashToHeatData(
  clickedHash: ClickedHash,
  scale?: number,
  imageEdgeX?: number,
  imageEdgeY?: number
): HashToHeatDataResult;

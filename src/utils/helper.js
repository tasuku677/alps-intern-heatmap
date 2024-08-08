// Convert a coordinate array to a hash map
export function convertToHashMap(coordinateArray) {
  const hashMap = {};
  coordinateArray.forEach(([x, y]) => {
    const key = `${x},${y}`;
    if (hashMap[key]) {
      hashMap[key] += 1;
    } else {
      hashMap[key] = 1;
    }
  });
  return hashMap;
}

// Convert a hash map to heat map data
export function hashToHeatData(clickedHash, scale = 1, imageEdgeX = 0, imageEdgeY = 0) {
  const heatmapData = [];
  
  Object.entries(clickedHash).forEach(([key, value]) => {
    const [x, y] = key.split(',').map(Number);
    heatmapData.push({
      x: Math.round(x * scale + imageEdgeX),
      y: Math.round(y * scale + imageEdgeY),
      value: value,
    });
  });

  return {
    heatmapData: heatmapData,
    minValue: Math.min(...Object.values(clickedHash)),
    maxValue: Math.max(...Object.values(clickedHash)),
  };
}

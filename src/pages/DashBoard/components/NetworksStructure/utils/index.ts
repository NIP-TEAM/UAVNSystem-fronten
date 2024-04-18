const _normalization = (
  target: number,
  max: number,
  min: number,
  rate: number = 100
) => ((target - min) / (max - min)) * rate;

export const positionFormate = (
  currentPos: [number, number],
  maxPos: [number, number],
  minPos: [number, number]
) => {
  if (currentPos[0] === 0)
    return {
      x: _normalization((maxPos[0] - minPos[0]) / 2, maxPos[0], minPos[0]),
      y: _normalization((maxPos[1] - minPos[1]) / 2, maxPos[1], minPos[1])
    };
  return {
    x: _normalization(currentPos[0], maxPos[0], minPos[0]),
    y: _normalization(currentPos[1], maxPos[1], minPos[1]),
  };
};

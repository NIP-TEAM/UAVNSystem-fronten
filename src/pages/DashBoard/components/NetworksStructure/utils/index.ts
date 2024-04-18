import { shuffle } from "lodash-es";

const _generateRandomNumber = (min: number = -25, max: number = 25): number =>
  Math.random() * (max - min + 1) + min;

// TODO: optimized this
export const mytest = (total: number) => {
  let currentPointCount = 3;
  let sum = 0;
  const initRadius = 300;
  let circle = 1;
  let dataArray: { x: number; y: number }[] = [];
  if (dataArray.length === 0) {
    do {
      const radius = initRadius * circle;
      const angle = ((Math.PI / 6) * 5) / currentPointCount;
      for (let i = 1; i <= currentPointCount; i++) {
        dataArray.push({
          x: _generateRandomNumber() - radius * Math.cos(i * angle),
          y: _generateRandomNumber() - radius * Math.sin(i * angle),
        });
      }
      circle++;
      sum += currentPointCount++;
      dataArray = shuffle(dataArray);
    } while (sum < total);
  }
  return (index: number) => dataArray[index];
};

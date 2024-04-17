import { FC, useRef } from "react";
import echarts, { EChartsOption } from "echarts";
import ReactCharts from "echarts-for-react";

export interface NetworkStructureProp {
  connectMap: string;
}

export const NetworkStructure: FC<NetworkStructureProp> = ({ connectMap }) => {
  const connectArray: [number, number][] = JSON.parse(connectMap || "[]");
  const MapRef = useRef<HTMLDivElement>(null);

  const option: EChartsOption = {
    series: [
      {
        type: "graph",
        layout: "force",
        animation: false,
        data: connectArray.map(([x, y], index) => ({
          x,
          y,
          fixed: true,
          symbolSize: 20,
          id: '' + index,
        })),
        force: {
          // initLayout: 'circular'
          // gravity: 0
          repulsion: 100,
          edgeLength: 5,
        },
        edges: [],
      },
    ],
  };

  return (
    <div>
      <ReactCharts option={option} />
    </div>
  );
};

import { CSSProperties, FC } from "react";
import { EChartsOption } from "echarts";
import ReactCharts from "echarts-for-react";
import { positionFormate } from "@/pages/DashBoard/components/NetworksStructure/utils";

export interface NetworkStructureProp {
  style?: CSSProperties;
  connectMap: string;
}

export const NetworkStructure: FC<NetworkStructureProp> = ({
  connectMap,
  style,
}) => {
  const connectArray: [number, number][] = JSON.parse(connectMap || "[]");
  const maxInfo = [
    Math.max(...connectArray.map(([x, _]) => x)),
    Math.max(...connectArray.map(([_, y]) => y)),
  ];
  const minInfo = [
    Math.min(...connectArray.map(([x, _]) => x)),
    Math.min(...connectArray.map(([_, y]) => y)),
  ];

  const option: EChartsOption = {
    series: [
      {
        type: "graph",
        layout: "force",
        animation: false,
        data: connectArray.map((currentPos, index) => ({
          ...positionFormate(currentPos, maxInfo, minInfo),
          fixed: true,
          symbolSize: 20,
          id: "" + index,
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

  return <ReactCharts option={option} style={style} />;
};

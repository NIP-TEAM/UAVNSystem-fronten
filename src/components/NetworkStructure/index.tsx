import { CSSProperties, FC } from "react";
import { EChartsOption } from "echarts";
import ReactCharts from "echarts-for-react";
import { mytest } from "@/pages/DashBoard/components/NetworksStructure/utils";

export interface NetworkStructureProp {
  title?: string;
  style?: CSSProperties;
  connectMap: string;
  uavs: { name: string; id: number }[];
}

export const NetworkStructure: FC<NetworkStructureProp> = ({
  connectMap,
  style,
  title,
  uavs,
}) => {
  const connectArray: [number, number][] = JSON.parse(connectMap || "[]");

  const getPosition = mytest(uavs.length);

  const option: EChartsOption = {
    title: {
      text: title,
    },
    series: [
      {
        type: "graph",
        layout: "none",
        animation: false,
        label: {
          show: true,
        },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20,
        },
        data: [
          {
            name: "base",
            x: 0,
            y: 0,
            id: "0",
            symbolSize: 20,
            fixed: true,
          },
          ...uavs.map((item, index) => ({
            ...item,
            id: item.id.toString(),
            ...getPosition(index),
            symbolSize: 20,
            fixed: true,
          })),
        ],
        links: 
          // {
          //   source: '0',
          //   target: '1',
          // },
          // {
          //   source: '0',
          //   target: '3',
          // },
          connectArray.map(([from, to]) => ({
            source: from.toString(),
            target: to.toString(),
          }))
        ,
        // data: [
        //   {
        //     name: 'Node 1',
        //     x: 300,
        //     y: 300
        //   },
        //   {
        //     name: 'Node 2',
        //     x: 800,
        //     y: 300
        //   },
        //   {
        //     name: 'Node 3',
        //     x: 550,
        //     y: 100
        //   },
        //   {
        //     name: 'Node 4',
        //     x: 550,
        //     y: 500
        //   }
        // ],
        // // links: [],
        // links: [
        //   {
        //     source: 0,
        //     target: 1,
            
        //   },
        //   {
        //     source: 'Node 2',
        //     target: 'Node 1',
        //   },
        //   {
        //     source: 'Node 1',
        //     target: 'Node 3'
        //   },
        //   {
        //     source: 'Node 2',
        //     target: 'Node 3'
        //   },
        //   {
        //     source: 'Node 2',
        //     target: 'Node 4'
        //   },
        //   {
        //     source: 'Node 1',
        //     target: 'Node 4'
        //   }
        // ],
      }
    ],
  };

  return <ReactCharts option={option} style={style} />;
};

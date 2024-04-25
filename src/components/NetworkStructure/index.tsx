import { CSSProperties, FC, useContext, useEffect, useMemo } from "react";
import { EChartsOption } from "echarts";
import ReactCharts from "echarts-for-react";
import { PositionInit } from "@/pages/DashBoard/components/NetworksStructure/utils";
import { useNavigate } from "react-router";
import { Empty, Spin } from "antd";
import { EntityDatatype, useGetEntity } from "@/service/Entity";
import { AppContext } from "@/App";
import { GraphNodeItemOption } from "echarts/types/src/chart/graph/GraphSeries.js";
import { useConfig } from "@/hooks";
import { useAtomValue } from "jotai";
import { THEMESNAME, themeAtom } from "@/store/Theme";

export interface NetworkStructureProp {
  style?: CSSProperties;
  connectMap: string;
  uavs: { name: string; id: number }[];
  showDetail?: boolean;
}

export const NetworkStructure: FC<NetworkStructureProp> = ({
  connectMap = "",
  style,
  uavs = [],
  showDetail,
}) => {
  const { messageApi } = useContext(AppContext);
  const theme = useAtomValue(themeAtom);
  const LanguageText =
    useConfig?.().useLanguage!<"NetworkStructure">("NetworkStructure");
  const navigete = useNavigate();
  const getPosition = PositionInit(uavs.length);

  const {
    fetchData: fetchEntityData,
    code: entityCode,
    loading: entityLoading,
    data: entityDataData,
    error: entityError,
  } = useGetEntity({ maps: connectMap });
  useEffect(() => {
    if (entityError) messageApi?.error(entityError);
  }, [entityError, messageApi]);
  useEffect(() => {
    fetchEntityData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const entityData = useMemo<EntityDatatype[]>(() => {
    if (entityDataData?.data && entityCode === 200) return entityDataData.data;
    return [];
  }, [entityCode, entityDataData?.data]);

  const option: EChartsOption = {
    series: [
      {
        type: "graph",
        layout: "none",
        animation: false,
        label: {
          show: true,
        },
        roam: !!showDetail,
        edgeSymbol: ["arrow"],
        edgeSymbolSize: [4],
        edgeLabel: {
          fontSize: 10,
          formatter: ({ value }) =>
            showDetail ? value?.toString() + "kb/s" || "" : "",
        },
        data: [
          {
            name: LanguageText.BaseName,
            x: 0,
            y: 0,
            id: "0",
            symbol: `image://base${
              theme === THEMESNAME.dark ? ".black" : ""
            }.svg`,
            symbolSize: 20,
            label: {
              position: "right",
            },
          },
          ...uavs.map(
            (item, index) =>
              ({
                ...item,
                id: item.id.toString(),
                ...getPosition(index),
                label: {
                  position: "bottom",
                  distance: 0,
                },
                symbol: `image://uav${
                  theme === THEMESNAME.dark ? ".black" : ""
                }.svg`,
                symbolSize: 32,
              } as GraphNodeItemOption)
          ),
        ],
        links: entityData.map(({ map: [from, to], status, speed }) => ({
          target: from.toString(),
          source: to.toString(),
          lineStyle: {
            ...(status ? {} : { color: "red" }),
            curveness: 0.03,
          },
          value: speed,
          label: {
            show: status,
          },
        })),
      },
    ],
  };

  const click = ({
    data: { id },
    event: { event },
  }: {
    data: { id: string };
    event: { event: PointerEvent };
  }) => {
    event.stopPropagation();
    if (!Number(id)) return;
    navigete("/uavs/" + id);
  };

  return (
    <Spin spinning={entityLoading}>
      {uavs?.length ? (
        <ReactCharts
          option={option}
          style={style}
          onEvents={{
            click,
          }}
        />
      ) : (
        <Empty />
      )}
    </Spin>
  );
};
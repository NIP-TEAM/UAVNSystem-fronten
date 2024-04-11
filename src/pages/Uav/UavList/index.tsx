import { Card, Tabs, Tooltip } from "antd";
import { FC, useEffect, useMemo } from "react";
import { ItemList, UavHeader } from "./components";
import { LanguageProvider } from "@/hooks";
import { NetworkDataType, useNetworkData } from "@/service";

interface UavListProp {}

export const UavList: FC<UavListProp> = () => {
  // TODO: optimized this
  const {
    fetchData: fetchNetworkData,
    loading: networkLoading,
    error: networkError,
    data: networkData,
    code: networkCode,
  } = useNetworkData({
    pagination: { pageSize: 1000, current: 1, total: 0 },
    filter: "",
  });
  useEffect(() => {
    fetchNetworkData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const networksData = useMemo<NetworkDataType[]>(() => {
    if (networkCode === 200 && networkData?.data) return networkData.data;
    return [];
  }, [networkCode, networkData?.data]);

  return (
    <LanguageProvider textKey="Uav">
      <Card>
        <UavHeader />
        {/* <Filter /> */}
        <Tabs
          destroyInactiveTabPane
          items={networksData.map(({id, name}) => ({
            key: id,
            label: <>
            {
              name.length > 20
                ? (
                  <Tooltip title={name}>
                    {`${name.slice(0, 20)}...`}
                  </Tooltip>
                )
                : name
            }
          </>,
            children: <ItemList {...{ id }} />,
          }))}
        />
      </Card>
    </LanguageProvider>
  );
};

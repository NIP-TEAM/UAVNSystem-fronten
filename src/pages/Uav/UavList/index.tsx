import { Card, Spin, Tabs, Tooltip } from "antd";
import { FC, useContext, useEffect, useMemo } from "react";
import { ItemList, UavHeader } from "./components";
import { LanguageProvider } from "@/hooks";
import { NetworkDataType, useNetworkData } from "@/service";
import { AppContext } from "@/App";

interface UavListProp {}

export const UavList: FC<UavListProp> = () => {
  const { messageApi } = useContext(AppContext)
  // TODO: optimized this api
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
  useEffect(() => {
    if(networkError) messageApi?.error(networkError)
  }, [messageApi, networkError])


  return (
    <LanguageProvider textKey="Uav">
      <Card>
        <UavHeader />
        <Spin spinning={networkLoading}>
          <Tabs
            destroyInactiveTabPane
            items={networksData.map(({ id, name }) => ({
              key: id,
              label: (
                <>
                  {name.length > 20 ? (
                    <Tooltip title={name}>{`${name.slice(0, 20)}...`}</Tooltip>
                  ) : (
                    name
                  )}
                </>
              ),
              children: <ItemList {...{ id }} />,
            }))}
          />
        </Spin>
      </Card>
    </LanguageProvider>
  );
};

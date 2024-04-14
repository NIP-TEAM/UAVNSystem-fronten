import { BasicCard } from "@/components";
import { LanguageProvider } from "@/hooks";
import { FC, useContext, useEffect, useMemo } from "react";
import { NetworkDetailHeader } from "./components";
import { useNetworkDetail } from "@/service";
import { useParams } from "react-router";
import { AppContext } from "@/App";

interface NetworkDetailProp {}

export const NetworkDetail: FC<NetworkDetailProp> = () => {
  const { messageApi } = useContext(AppContext);
  const { id } = useParams();
  const {
    fetchData: fetchDetailData,
    code: detailCode,
    error: detailError,
    data: detailData,
    loading: detailLoading,
  } = useNetworkDetail(id || "");
  useEffect(() => {
    if (detailError) messageApi?.error(detailError);
  }, [messageApi, detailError]);
  useEffect(() => {
    fetchDetailData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const networkInfo = useMemo(() => {
    if (detailCode === 200 && detailData?.data) return detailData?.data;
  }, [detailCode, detailData?.data]);

  return (
    <LanguageProvider textKey="NetworkDetail">
      <BasicCard loading={detailLoading}>
        <NetworkDetailHeader name={networkInfo?.name} />
      </BasicCard>
    </LanguageProvider>
  );
};

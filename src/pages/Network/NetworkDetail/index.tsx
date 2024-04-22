import { BasicCard, NetworkStructure } from "@/components";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DetailDescription, NetworkDetailHeader } from "./components";
import { NetworkDataType, useNetworkDetail } from "@/service";
import { useParams } from "react-router";
import { AppContext } from "@/App";
import { Card, Divider, Form } from "antd";

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

  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm<Partial<NetworkDataType>>();

  return (
    <BasicCard loading={detailLoading}>
      <Form
        form={form}
        onFinish={(value) => console.log(value)}
        initialValues={networkInfo}
      >
        <NetworkDetailHeader
          {...{ name: networkInfo?.name, editing, setEditing }}
        />
        <Divider />
        <DetailDescription {...{ networkInfo, editing }} />
      </Form>
      <Card>
        <NetworkStructure {...networkInfo!} />
      </Card>
    </BasicCard>
  );
};

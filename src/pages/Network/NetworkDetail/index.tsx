import { BasicCard, NetworkStructure } from "@/components";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DetailDescription, NetworkDetailHeader } from "./components";
import { NetworkDataType, useNetworkDetail, useUpdateNetwork } from "@/service";
import { useParams } from "react-router";
import { Button, Card, Divider, Flex, Form, FormProps, Modal } from "antd";
import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";

interface NetworkDetailProp {}

export const NetworkDetail: FC<NetworkDetailProp> = () => {
  const { id } = useParams();
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"NetworkDetail">();
  const {
    fetchData: fetchDetailData,
    code: detailCode,
    data: detailData,
    loading: detailLoading,
  } = useNetworkDetail(id || "");
  useEffect(() => {
    fetchDetailData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const networkInfo = useMemo(() => {
    if (detailCode === 200 && detailData?.data) return detailData?.data;
  }, [detailCode, detailData?.data]);

  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm<Partial<NetworkDataType>>();
  const formValue = Form.useWatch([], form);

  const [modalOpen, setModalOpen] = useState(false);

  // update info
  const {
    fetchData: fetchNetworkUpdate,
    loading: networkUpdateLoading,
    code: networkUpdateCode,
    error: networkUpdateError,
  } = useUpdateNetwork(id!, formValue);
  useEffect(() => {
    if (networkUpdateError) messageApi?.error(networkUpdateError);
  }, [networkUpdateError, messageApi]);
  useEffect(() => {
    if (networkUpdateCode === 200) {
      messageApi?.success(LanguageText.updateSuccess);
      fetchDetailData?.();
      setModalOpen(false);
      setEditing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LanguageText.updateSuccess, messageApi, networkUpdateCode]);

  const onFinish: FormProps["onFinish"] = () => {
    if (formValue?.protocolId !== networkInfo?.protocol?.id) setModalOpen(true);
    else fetchNetworkUpdate?.();
  };

  const mapStructure = useMemo(
    () => <NetworkStructure {...networkInfo!} showDetail />,
    [networkInfo]
  );

  const [highResponse, setHighResponse] = useState(false);
  const intervalRef = useRef<number | undefined>();

  useEffect(() => {
    if (highResponse) {
      intervalRef.current = window.setInterval(() => fetchDetailData?.(), 5000);
      return () => window.clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highResponse]);

  return (
    <>
      <Button
        type={highResponse ? "default" : "primary"}
        style={{ marginLeft: 10 }}
        onClick={() => setHighResponse((prev) => !prev)}
      >
        {highResponse ? LanguageText.modeButtonOff : LanguageText.modeButtonOn}
      </Button>
      <BasicCard loading={detailLoading} style={{ marginTop: 3 }}>
        <Modal
          open={modalOpen}
          confirmLoading={networkUpdateLoading}
          onOk={() => fetchNetworkUpdate?.()}
          onCancel={() => setModalOpen(false)}
        >
          {LanguageText.protocolAlert}
        </Modal>
        <Form form={form} onFinish={onFinish} initialValues={networkInfo}>
          <NetworkDetailHeader
            {...{
              name: networkInfo?.name,
              editing,
              setEditing,
              fetchDetailData,
              detailLoading,
            }}
          />
          <Divider />
          <DetailDescription {...{ networkInfo, editing }} />
        </Form>
        <Card>{mapStructure}</Card>
      </BasicCard>
    </>
  );
};

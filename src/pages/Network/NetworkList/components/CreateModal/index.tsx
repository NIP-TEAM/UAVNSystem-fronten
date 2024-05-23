import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useCreateNetwork, useGetProtocols } from "@/service";
import { Button, Flex, Form, Input, Modal, Select, SelectProps } from "antd";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CreateModalProp {
  refreshNetwork: Dispatch<SetStateAction<number>>;
}

export const CreateModal: FC<CreateModalProp> = ({ refreshNetwork }) => {
  const { LanguageText } = useLanguageContext<"Network">();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        {LanguageText.new}
      </Button>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title={LanguageText.createTitle}
        footer={false}
        destroyOnClose
      >
        <CreateModalMaintain
          setOpen={setIsOpen}
          refreshNetwork={refreshNetwork}
        />
      </Modal>
    </>
  );
};

interface CreateModalMaintainProp {
  setOpen: Dispatch<SetStateAction<boolean>>;
  refreshNetwork: Dispatch<SetStateAction<number>>;
}

interface FormItemProtocol {
  name: string;
  protocolId: number;
}

const CreateModalMaintain: FC<CreateModalMaintainProp> = ({
  setOpen,
  refreshNetwork,
}) => {
  const { LanguageText } = useLanguageContext<"Network">();
  const { messageApi } = useContext(AppContext);
  const [form] = Form.useForm<FormItemProtocol>();
  const formValue = Form.useWatch([], form);

  // protocol Data
  const {
    fetchData: fetchProtocols,
    data: protocolsDataData,
    code: protocolsCode,
    loading: protocolsLoading,
  } = useGetProtocols({
    pagination: { pageSize: 100000, current: 1, total: 100000 },
    filter: "",
  });
  useEffect(() => {
    fetchProtocols?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const protocolsOptions = useMemo<SelectProps["options"]>(() => {
    if (protocolsCode === 200 && protocolsDataData?.data)
      return protocolsDataData.data.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
    return [];
  }, [protocolsCode, protocolsDataData]);

  const {
    fetchData: fetchCreateData,
    loading: createLoading,
    error: createError,
    code: createCode,
  } = useCreateNetwork(formValue || {});
  useEffect(() => {
    if (createError) messageApi?.error(createError);
  }, [createError, messageApi]);
  useEffect(() => {
    if (createCode === 200) {
      messageApi?.success(LanguageText.createSuccess);
      refreshNetwork(new Date().getTime());
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createCode, messageApi]);

  const handleFinish = () => {
    fetchCreateData?.();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item<FormItemProtocol>
        name="name"
        required
        rules={[{ required: true }]}
        label={LanguageText.nameItem}
        style={{ width: "60%" }}
      >
        <Input />
      </Form.Item>
      <Form.Item<FormItemProtocol>
        name="protocolId"
        label={LanguageText.protocolLabel}
        rules={[{ required: true }]}
      >
        <Select
          options={protocolsOptions}
          allowClear
          showSearch
          filterOption={(input, option) =>
            ((option?.label || "") as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          style={{ width: "60%" }}
          loading={protocolsLoading}
        />
      </Form.Item>
      <Form.Item>
        <Flex align="center" justify="end" gap={5}>
          <Button onClick={() => setOpen(false)}>{LanguageText.cancel}</Button>
          <Button type="primary" htmlType="submit" loading={createLoading}>
            {LanguageText.confirm}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useCreateNetwork } from "@/service";
import { Button, Flex, Form, Input, Modal } from "antd";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
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
  [key: string]: unknown;
}

const CreateModalMaintain: FC<CreateModalMaintainProp> = ({
  setOpen,
  refreshNetwork,
}) => {
  const { LanguageText } = useLanguageContext<"Network">();
  const { messageApi } = useContext(AppContext);
  const [form] = Form.useForm<FormItemProtocol>();
  const [formValue, setFormValue] = useState<FormItemProtocol>();

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
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      onValuesChange={(newValue) => setFormValue(newValue)}
    >
      <Form.Item<FormItemProtocol>
        name="name"
        required
        rules={[{ required: true }]}
        label={LanguageText.nameItem}
      >
        <Input style={{ width: "60%" }} />
      </Form.Item>
      <Form.Item>uavs setting</Form.Item>
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

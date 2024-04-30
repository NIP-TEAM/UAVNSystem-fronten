import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useControllerContext } from "@/pages/Contact/ContactList/hooks";
import { useCreateContactList } from "@/service";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal } from "antd";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";

export interface NewContactListModalProp {}

export const NewContactListModal: FC<NewContactListModalProp> = () => {
  const { LanguageText } = useLanguageContext<"Contact">();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="link"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title={LanguageText.createGroupTitle}
        destroyOnClose
      >
        <NewContactListModalContent {...{ setOpen }} />
      </Modal>
    </>
  );
};

interface NewContactListModalContentProp {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

type FormType = {
  name: string;
};

const NewContactListModalContent: FC<NewContactListModalContentProp> = ({
  setOpen,
}) => {
  const navigate = useNavigate();
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();
  const { contactListRefresh } = useControllerContext();

  const [form] = Form.useForm<FormType>();
  const [groupInfo, setGroupInfo] = useState<FormType>({
    name: "",
  });

  const {
    fetchData: fetchCreate,
    code: createCode,
    loading: createLoading,
    error: createError,
  } = useCreateContactList(groupInfo);
  useEffect(() => {
    if (createError) messageApi?.error(createError);
  }, [messageApi, createError]);
  useEffect(() => {
    if (createCode === 200) {
      messageApi?.success(
        <>
          {LanguageText.createGroupSuccess}
          <Button type="link" onClick={() => navigate(`/contact/create`)}>
            {LanguageText.toCreateContactLink}
          </Button>
        </>
      );
      contactListRefresh?.();
      setOpen(false);
    }
  }, [
    LanguageText.createGroupSuccess,
    LanguageText.toCreateContactLink,
    contactListRefresh,
    createCode,
    messageApi,
    navigate,
    setOpen,
  ]);

  return (
    <Form
      form={form}
      onValuesChange={(newValue) =>
        setGroupInfo((prev) => ({
          ...prev,
          ...newValue,
        }))
      }
      onFinish={() => fetchCreate?.()}
    >
      <Form.Item
        required
        name="name"
        label={LanguageText.nameLabel}
        rules={[{ required: true, message: LanguageText.nameEmpty }]}
      >
        <Input style={{ width: "50%" }} />
      </Form.Item>
      <Form.Item noStyle>
        <Flex align="center" justify="flex-end">
          <Flex align="center" gap={3}>
            <Button onClick={() => setOpen(false)}>
              {LanguageText.cancelTitle}
            </Button>
            <Button type="primary" htmlType="submit" loading={createLoading}>
              {LanguageText.okText}
            </Button>
          </Flex>
        </Flex>
      </Form.Item>
    </Form>
  );
};

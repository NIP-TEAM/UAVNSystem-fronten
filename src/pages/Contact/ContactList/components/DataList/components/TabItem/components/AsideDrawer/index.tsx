import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { ContactDataType, useGetContact, useGetContactLists } from "@/service";
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Drawer,
  Flex,
  Form,
  Input,
  Typography,
} from "antd";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface AsideDrawerProp {
  id: number;
  name: string;
}

type ContactInfoType = Partial<ContactDataType>;

export const AsideDrawer: FC<AsideDrawerProp> = ({ id, name }) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  //   contact detail
  const {
    fetchData: fetchContact,
    code: contactCode,
    error: contactError,
    loading: contactLoading,
    data: contactDataData,
  } = useGetContact(id);
  useEffect(() => {
    if (contactError) messageApi?.error(contactError);
  }, [contactError, messageApi]);
  const contactInfo = useMemo<ContactInfoType>(() => {
    if (contactCode === 200 && contactDataData?.data) {
      return contactDataData?.data;
    }
    return {};
  }, [contactCode, contactDataData?.data]);

  return (
    <>
      <Button
        type="link"
        onClick={() => {
          setOpen(true);
          fetchContact?.();
        }}
      >
        {LanguageText.toDetailTitle}
      </Button>
      <Drawer
        open={open}
        loading={contactLoading}
        onClose={() => setOpen(false)}
        title={name}
        extra={
          <Button
            type={edit ? "default" : "primary"}
            onClick={() => setEdit((prev) => !prev)}
          >
            {edit ? LanguageText.cancelTitle : LanguageText.editButton}
          </Button>
        }
      >
        <ContactInfo {...{ edit, contactInfo, setEdit }} />
      </Drawer>
    </>
  );
};

const ContactInfo: FC<{
  edit: boolean;
  contactInfo: ContactInfoType;
  setEdit: Dispatch<SetStateAction<boolean>>;
}> = ({ edit, contactInfo, setEdit }) => {
  const {
    id,
    name = "",
    phone = "",
    email = "",
    updatedAt = "",
    createdAt = "",
    creator = {},
  } = contactInfo;

  const { LanguageText } = useLanguageContext<"Contact">();

  // get all contact list
  const {
    fetchData: fetchContactLists,
    data: contactListsDataData,
    error: contactListsError,
    loading: contactListsLoading,
  } = useGetContactLists();

  const [form] = Form.useForm<ContactInfoType>();
  const [formValue, setFormValue] = useState<ContactInfoType>({});

  return (
    <Form
      form={form}
      onFinish={() => console.log(formValue)}
      onValuesChange={(newValue) =>
        setFormValue((prev) => ({ ...prev, ...newValue }))
      }
    >
      <>
        <Header name={LanguageText.idTitle} />
        {edit ? (
          <Form.Item<ContactDataType["id"]> name="id" initialValue={id}>
            <Input disabled style={{ width: "30%" }} />
          </Form.Item>
        ) : (
          <Typography.Text>{id}</Typography.Text>
        )}
      </>
      <>
        <Header name={LanguageText.nameTitle} />
        {edit ? (
          <Form.Item<ContactDataType["name"]> name="name" initialValue={name}>
            <Input />
          </Form.Item>
        ) : (
          <Typography.Text>{name}</Typography.Text>
        )}
      </>
      {edit && (
        <Flex justify="end">
          <Button type="primary" htmlType="submit">
            {LanguageText.saveButton}
          </Button>
        </Flex>
      )}
    </Form>
  );
};

const Header: FC<{ name: string }> = ({ name }) => (
  <Typography.Title level={5}>{name}</Typography.Title>
);

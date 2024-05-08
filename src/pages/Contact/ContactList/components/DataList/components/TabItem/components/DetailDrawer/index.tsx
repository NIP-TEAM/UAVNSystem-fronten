import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useContactGlobalContext } from "@/pages/Contact/ContactList/hooks";
import { ContactDataType, useGetContact, useUpdateContact } from "@/service";
import { basicTimeFormate } from "@/utils";
import { QuestionCircleFilled } from "@ant-design/icons";
import {
  Button,
  Drawer,
  DrawerProps,
  Flex,
  Form,
  Input,
  Select,
  SelectProps,
  Tooltip,
  Typography,
} from "antd";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";

export interface AsideDrawerProp {
  id: number;
  fetchContact?: () => void;
}

type ContactInfoType = Partial<ContactDataType>;

export const DetailDrawer: FC<AsideDrawerProp> = ({ id, fetchContact }) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [edited, setEdited] = useState(false)

  //  contact detail
  const {
    fetchData: fetchContactInfo,
    code: contactInfoCode,
    error: contactInfoError,
    loading: contactInfoLoading,
    data: contactInfoDataData,
  } = useGetContact(id);
  useEffect(() => {
    if (contactInfoError) messageApi?.error(contactInfoError);
  }, [contactInfoError, messageApi]);
  const contactInfo = useMemo<ContactInfoType>(() => {
    if (contactInfoCode === 200 && contactInfoDataData?.data) {
      return contactInfoDataData?.data;
    }
    return {};
  }, [contactInfoCode, contactInfoDataData?.data]);

  const onClose: DrawerProps['onClose'] = () => {
    setOpen(false);
    setEdit(false);
    if (edited) setTimeout(() => {
      fetchContact?.()
    }, 300);
    setEdited(false);
  }

  return (
    <>
      <Button
        type="link"
        onClick={() => {
          setOpen(true);
          fetchContactInfo?.();
        }}
      >
        {LanguageText.toDetailTitle}
      </Button>
      <Drawer
        open={open}
        loading={contactInfoLoading}
        onClose={onClose}
        title={contactInfo?.name}
        extra={
          <Button
            type={edit ? "default" : "primary"}
            onClick={() => setEdit((prev) => !prev)}
          >
            {edit ? LanguageText.cancelTitle : LanguageText.editButton}
          </Button>
        }
      >
        <ContactInfo
          {...{
            edit,
            contactInfo,
            setEdit,
            fetchContactInfo,
            setEdited,
          }}
        />
      </Drawer>
    </>
  );
};

const ContactInfo: FC<{
  edit: boolean;
  contactInfo: ContactInfoType;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEdited: Dispatch<SetStateAction<boolean>>;
  fetchContactInfo?: () => void;
}> = ({ edit, contactInfo, setEdit, fetchContactInfo, setEdited }) => {
  const {
    id = -1,
    name = "",
    phone = "",
    email = "",
    updateAt = "",
    createAt = "",
    creator,
    contactListIds = [],
  } = contactInfo;

  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Contact">();
  const { messageApi } = useContext(AppContext);
  const { contactListData, contactListLoading } = useContactGlobalContext();

  const options = useMemo<SelectProps["options"]>(
    () => contactListData.map(({ id, name }) => ({ label: name, value: id })),
    [contactListData]
  );

  const [form] = Form.useForm<ContactInfoType>();
  const [formValue, setFormValue] = useState<ContactInfoType>({});

  // update contact info
  const {
    fetchData: fetchUpdate,
    error: updateError,
    code: updateCode,
    loading: updateLoading,
  } = useUpdateContact(id, formValue);
  useEffect(() => {
    if (updateError) messageApi?.error(updateError);
  }, [updateError, messageApi]);
  useEffect(() => {
    if (updateCode === 200) {
      messageApi?.success(LanguageText.updateContactSuccess);
      setEdited(true);
      setEdit(false);
      fetchContactInfo?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCode, messageApi, LanguageText.updateContactSuccess, setEdit]);

  return (
    <Form
      form={form}
      onFinish={() => fetchUpdate?.()}
      onValuesChange={(newValue) =>
        setFormValue((prev) => ({ ...prev, ...newValue }))
      }
    >
      <FormItem name={LanguageText.nameLabel}>
        {edit ? (
          <Form.Item<ContactDataType["name"]> name="name" initialValue={name}>
            <Input allowClear />
          </Form.Item>
        ) : (
          <Typography.Text>{name}</Typography.Text>
        )}
      </FormItem>

      <FormItem name={LanguageText.emailLabel}>
        {edit ? (
          <Form.Item<ContactDataType["email"]>
            name="email"
            rules={[
              {
                pattern:
                  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                message: LanguageText.emailInvalid,
              },
            ]}
            initialValue={email}
          >
            <Input allowClear />
          </Form.Item>
        ) : (
          <Typography.Text>{email}</Typography.Text>
        )}
      </FormItem>
      <FormItem name={LanguageText.phoneLabel}>
        {edit ? (
          <Form.Item<ContactDataType["phone"]>
            name="phone"
            rules={[
              { pattern: /^\d{11}$/, message: LanguageText.phoneInvalid },
            ]}
          >
            <Flex gap="small">
              <Input
                count={{
                  show: true,
                  max: 11,
                }}
                defaultValue={phone}
                allowClear
              />
              <Tooltip title={LanguageText.phoneTip}>
                <QuestionCircleFilled />
              </Tooltip>
            </Flex>
          </Form.Item>
        ) : (
          <Typography.Text>{phone}</Typography.Text>
        )}
      </FormItem>

      <FormItem name={LanguageText.contactListLabel}>
        {edit ? (
          <Form.Item<ContactDataType["contactListIds"]>
            name="contactListIds"
            initialValue={contactListIds}
            style={{ width: "65%" }}
          >
            <Select
              mode="multiple"
              allowClear
              options={options}
              maxTagCount="responsive"
              loading={contactListLoading}
            />
          </Form.Item>
        ) : (
          contactListIds.map((item) => (
            <Typography.Text key={item}>
              {contactListData.find(({ id }) => id === item)?.name}
            </Typography.Text>
          ))
        )}
      </FormItem>

      <FormItem name={LanguageText.idLabel}>
        <Typography.Text type={edit ? "secondary" : undefined}>
          {id}
        </Typography.Text>
      </FormItem>

      <FormItem name={LanguageText.creatorLabel}>
        <Typography.Link
          disabled={edit}
          type={edit ? "secondary" : undefined}
          onClick={() => navigate("usercenter/" + creator?.id)}
        >
          {creator?.name}
        </Typography.Link>
      </FormItem>

      <FormItem name={LanguageText.createAtLabel}>
        <Typography.Text type={edit ? "secondary" : undefined}>
          {basicTimeFormate(createAt)}
        </Typography.Text>
      </FormItem>

      <FormItem name={LanguageText.updateAtLabel}>
        <Typography.Text type={edit ? "secondary" : undefined}>
          {basicTimeFormate(updateAt)}
        </Typography.Text>
      </FormItem>

      {edit && (
        <Flex justify="end">
          <Button type="primary" htmlType="submit" loading={updateLoading}>
            {LanguageText.saveButton}
          </Button>
        </Flex>
      )}
    </Form>
  );
};

const FormItem: FC<{ name: string; children: ReactNode }> = ({
  name,
  children,
}) => (
  <Flex align="baseline" gap="small" style={{ marginBottom: 3 }}>
    <Typography.Text strong>{name}</Typography.Text>
    {children}
  </Flex>
);

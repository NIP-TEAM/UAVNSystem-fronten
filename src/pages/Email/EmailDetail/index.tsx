import { BasicCard } from "@/components";
import { EmailDataType, useGetEmail } from "@/service";
import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Header } from "./components";
import {
  Collapse,
  CollapseProps,
  Descriptions,
  DescriptionsProps,
  Form,
  Input,
  Tooltip,
  Typography,
} from "antd";
import { useLanguageContext } from "@/hooks";
import { basicTimeFormate } from "@/utils";

export interface EmailDetailProp {}

export const EmailDetail: FC<EmailDetailProp> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Email">();

  const [editing, setEditing] = useState(false);

  // emailData
  const {
    fetchData: fetchEmail,
    code: emailCode,
    data: emailDataData,
  } = useGetEmail(+id!);
  useEffect(() => {
    fetchEmail?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const emailData = useMemo<EmailDataType>(() => {
    if (emailCode === 200 && emailDataData?.data) return emailDataData.data;
    return {} as EmailDataType;
  }, [emailCode, emailDataData?.data]);
  const editable = useMemo(() => !emailData?.onSchedule, [emailData]);

  const [form] = Form.useForm<EmailDataType>();

  const collapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: LanguageText.sendToTitle,
      children: (
        <>
          {emailData?.contacts?.map(({ email, name }) => (
            <Tooltip title={email}>{name}</Tooltip>
          ))}
        </>
      ),
    },
  ];

  const items: DescriptionsProps["items"] = [
    {
      key: "id",
      label: LanguageText.idLabel,
      children: (
        <Typography.Text type={editing ? "secondary" : undefined}>
          {emailData?.id}
        </Typography.Text>
      ),
    },
    {
      key: "name",
      label: LanguageText.nameLabel,
      span: 2,
      children: (
        <>
          {editing ? (
            <Form.Item<EmailDataType>
              name="name"
              initialValue={emailData?.name}
            >
              <Input />
            </Form.Item>
          ) : (
            <>{emailData?.name}</>
          )}
        </>
      ),
    },
    {
      key: "network",
      label: LanguageText.networkLabel,
      children: (
        <Typography.Link
          disabled={editing}
          onClick={() => navigate("/network/" + emailData?.network?.id)}
        >
          {emailData?.network?.name}
        </Typography.Link>
      ),
    },
    {
      key: "creator",
      label: LanguageText.creatorLabel,
      children: (
        <Typography.Link
          disabled={editing}
          onClick={() => navigate("/user/" + emailData?.creator?.id)}
        >
          {emailData?.creator?.name}
        </Typography.Link>
      ),
    },
    {
      key: "createAt",
      label: LanguageText.createAtLabel,
      children: <>{basicTimeFormate(emailData?.createAt)}</>,
    },
    {
      key: "updateAt",
      label: LanguageText.updateAtLabel,
      span: 3,
      children: <>{basicTimeFormate(emailData?.updateAt)}</>,
    },
    {
      key: "sendTo",
      span: 3,
      children: <Collapse items={collapseItems} style={{width: "80%"}} />,
    },
  ];

  return (
    <BasicCard>
      <Header {...{ editing, setEditing, editable, id: emailData?.id }} />
      <Form form={form}>
        <Descriptions items={items} />
      </Form>
    </BasicCard>
  );
};

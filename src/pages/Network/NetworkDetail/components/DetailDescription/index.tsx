import { DescriptionsProps } from "antd/es/descriptions";
import { Button, Descriptions, Form, Input, Typography } from "antd";
import { FC, useState } from "react";
import { useLanguageContext } from "@/hooks";
import { NetworkDataType } from "@/service";
import { useStatusDescription } from "@/pages/Network/hook";
import { basicTimeFormate } from "@/utils";
import { useNavigate } from "react-router";

export interface DetailDescriptionProp {
  networkInfo?: NetworkDataType;
  editing: boolean;
}

export const DetailDescription: FC<DetailDescriptionProp> = ({
  editing,
  networkInfo,
}) => {
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"NetworkDetail">();
  const StatusDescription = useStatusDescription();
  const items: DescriptionsProps["items"] = [
    {
      key: "id",
      label: LanguageText.idLabel,

      children: (
        <Typography.Text
          type="secondary"
          style={editing ? { cursor: "not-allowed" } : {}}
        >
          {networkInfo?.id}
        </Typography.Text>
      ),
    },
    {
      key: "networkName",
      label: LanguageText.nameLabel,
      span: 2,
      children: editing ? (
        <Form.Item<NetworkDataType> name="name" noStyle>
          <Input style={{ width: "50%" }} />
        </Form.Item>
      ) : (
        networkInfo?.name
      ),
    },
    {
      key: "type",
      label: LanguageText.typeLabel,
      children: "222",
    },
    {
      key: "creator",
      label: LanguageText.creatorLabel,
      children: (
        <Button
          type="link"
          disabled={editing}
          style={{ margin: 0, padding: 0 }}
          onClick={() => navigate("./usercenter/" + networkInfo?.creator?.id)}
        >
          @{networkInfo?.creator?.name}
        </Button>
      ),
    },
    {
      key: "status",
      label: LanguageText.statusLabel,
      children: (
        <Typography.Text
          type="secondary"
          style={editing ? { cursor: "not-allowed" } : {}}
        >
          {StatusDescription[networkInfo?.status || 0]?.icon}{" "}
          {StatusDescription[networkInfo?.status || 0]?.description}
        </Typography.Text>
      ),
    },
    {
      key: "createAt",
      label: LanguageText.createAtLabel,
      children: (
        <Typography.Text
          type="secondary"
          style={editing ? { cursor: "not-allowed" } : {}}
        >
          {basicTimeFormate(networkInfo?.createAt || "0")}
        </Typography.Text>
      ),
    },
    {
      key: "uavCount",
      label: LanguageText.uavCountLabel,
      children: networkInfo?.uavsCount || 0,
    },
  ];
  return <Descriptions items={items} layout="vertical" />;
};

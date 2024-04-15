import { DescriptionsProps } from "antd/es/descriptions";
import { Descriptions } from "antd";
import { FC, useState } from "react";
import { useLanguageContext } from "@/hooks";
import { NetworkDataType } from "@/service";

export interface DetailDescriptionProp {
  networkInfo?: NetworkDataType;
  editing: boolean;
}

export const DetailDescription: FC<DetailDescriptionProp> = ({
  networkInfo,
}) => {
  const { LanguageText } = useLanguageContext<"NetworkDetail">();
  const items: DescriptionsProps["items"] = [
    {
      key: "idLabel",
      label: LanguageText.idLabel,
      children: "111",
    },
    {
      key: "networkName",
      label: LanguageText.nameLabel,
      children: "Zhou Maomao",
    },
    {
      key: "type",
      label: LanguageText.typeLabel,
      children: "222"
    },
    {
      key: "status",
      label: LanguageText.statusLabel,
      children: "1810000000",
    },
    {
      key: "createAt",
      label: LanguageText.createAtLabel,
      children: "Hangzhou, Zhejiang",
    },
    {
      key: "uavCount",
      label: LanguageText.uavCountLabel,
      span: 2,
      children:
        "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
    }
  ];
  return <Descriptions items={items}>111</Descriptions>;
};

import { DescriptionsProps } from "antd/es/descriptions";
import { Descriptions } from "antd";
import { FC } from "react";
import { useLanguageContext } from "@/hooks";
import { NetworkDataType } from "@/service";

export interface DetailDescriptionProp {
  networkInfo: NetworkDataType;
}

export const DetailDescription: FC<DetailDescriptionProp> = ({
  networkInfo,
}) => {
  const { LanguageText } = useLanguageContext<"NetworkDetail">();
  const items: DescriptionsProps["items"] = [
    {
      key: "networkName",
      label: LanguageText.nameLabel,
      children: "Zhou Maomao",
    },
    {
      key: "2",
      label: "Telephone",
      children: "1810000000",
    },
    {
      key: "3",
      label: "Live",
      children: "Hangzhou, Zhejiang",
    },
    {
      key: "4",
      label: "Address",
      span: 2,
      children:
        "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
    },
    {
      key: "5",
      label: "Remark",
      children: "empty",
    },
  ];
  return <Descriptions>111</Descriptions>;
};

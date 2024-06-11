import { DescriptionsProps } from "antd/es/descriptions";
import {
  Button,
  Descriptions,
  Form,
  Input,
  Select,
  SelectProps,
  Typography,
} from "antd";
import { FC, useEffect, useMemo } from "react";
import { useLanguageContext } from "@/hooks";
import { NetworkDataType, useGetProtocols } from "@/service";
import { useStatusDescription } from "@/pages/Network/hooks";
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
      children: editing ? (
        <Form.Item<NetworkDataType>
          name="protocolId"
          style={{ width: "60%" }}
          initialValue={networkInfo?.protocol?.id}
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
            loading={protocolsLoading}
          />
        </Form.Item>
      ) : (
        networkInfo?.protocol?.name
      ),
    },
    {
      key: "creator",
      label: LanguageText.creatorLabel,
      children: (
        <Button
          type="link"
          disabled={editing}
          style={{ margin: 0, padding: 0 }}
          onClick={() => navigate("/user/" + networkInfo?.creator?.id)}
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
      children: networkInfo?.uavCount || 0,
    },
  ];
  return <Descriptions items={items} layout="vertical" />;
};

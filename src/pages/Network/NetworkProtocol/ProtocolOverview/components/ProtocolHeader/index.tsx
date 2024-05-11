import { useLanguageContext } from "@/hooks";
import { Flex, Input, Select, Typography } from "antd";
import { Dispatch, FC } from "react";
import { FilterType } from "../../../types";
import { SetStateAction } from "jotai";
import { debounce } from "lodash-es";

export interface ProtocolHeaderProp {
  setFilter: Dispatch<SetStateAction<FilterType>>;
}

export const ProtocolHeader: FC<ProtocolHeaderProp> = ({ setFilter }) => {
  const { LanguageText } = useLanguageContext<"NetworkProtocol">();
  return (
    <Flex align="baseline" justify="flex-start" gap="large">
      <Typography.Title level={4}>
        {LanguageText.protocolTitle}
      </Typography.Title>
      <Select
        placeholder={LanguageText.typePlaceholder}
        style={{ width: "12em" }}
        allowClear
        options={[
          { label: LanguageText.defaultType, value: "default" },
          { label: LanguageText.customerType, value: "custom" },
        ]}
        onChange={(value) => {
          setFilter((prev) => ({
            ...prev,
            type: value,
          }));
        }}
      />
      <Input.Search
        allowClear
        style={{ width: "16em" }}
        onChange={debounce(
          (e) =>
            setFilter((prev) => ({
              ...prev,
              searchKey: e.target.value,
            })),
          600
        )}
      />
    </Flex>
  );
};

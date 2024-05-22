import { useLanguageContext } from "@/hooks";
import { EmailDataType } from "@/service";
import { Form, Select, SelectProps } from "antd";
import { FC } from "react";
import { useEmailCreateGlobalContext } from "../../hooks";
import { ConditionOptions, SelectItem } from "./components";

export interface CollapseItemProp {
  restField: { [key: string]: unknown };
  parentFieldName: number;
}

export const CollapseItem: FC<CollapseItemProp> = ({
  restField,
  parentFieldName,
}) => {
  const { LanguageText } = useLanguageContext<"CreateEmail">();
  const {
    dataSet: { networksData },
    loadingSet: { networksDataLoading },
  } = useEmailCreateGlobalContext();

  const handleFilterOption: SelectProps["filterOption"] = (input, option) =>
    ((option?.label || "") as string)
      .toLowerCase()
      .includes(input.toLowerCase());

  return (
    <>
      <Form.Item<EmailDataType["networkId"]>
        name={[parentFieldName, "networkId"]}
        label={LanguageText.networkLabel}
        rules={[{ required: true, message: LanguageText.networkRequired }]}
        style={{ width: "40%" }}
        {...restField}
      >
        <Select
          options={networksData}
          showSearch
          filterOption={handleFilterOption}
          loading={networksDataLoading}
        />
      </Form.Item>
      <SelectItem
        name={[parentFieldName, "contactIds"]}
        label={LanguageText.contactIdsLabel}
        rules={[{ required: true, message: LanguageText.contactIdsEmpty }]}
        style={{ width: "40%" }}
        {...restField}
      />
      <Form.List name={[parentFieldName, "condition"]}>
        {(fields) => (
          <>
            {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              fields.map(({ key, name }) => (
                <ConditionOptions
                  key={name}
                  fieldName={[parentFieldName, name]}
                />
              ))
            }
          </>
        )}
      </Form.List>
    </>
  );
};

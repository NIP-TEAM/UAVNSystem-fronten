import { useLanguageContext } from "@/hooks";
import { categoryOptions } from "@/pages/Network/NetworkList/components/Filter/components/FormFieldItem/selectOptions";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { SetStateAction } from "jotai";
import { Dispatch, FC, useEffect } from "react";
import { FormFieldItem } from "./components";
import { CategoryOptions } from "./components/FormFieldItem/selectOptions";
import { ContactListDataControllerType } from "@/service";

export interface FilterProp {
  initParams?: ContactListDataControllerType;
  setDataController: Dispatch<SetStateAction<ContactListDataControllerType>>;
  setTimestamp: Dispatch<SetStateAction<number>>;
}

export const Filter: FC<FilterProp> = ({
  setDataController,
  setTimestamp,
  initParams,
}) => {
  const { LanguageText } = useLanguageContext<"Contact">();
  return <div>{LanguageText.filterTitle}</div>;
};

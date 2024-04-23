import { useLanguageContext } from "@/hooks";
import { categoryOptions } from "@/pages/Network/NetworkList/components/Filter/components/FormFieldItem/selectOptions";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { SetStateAction } from "jotai";
import { Dispatch, FC, useEffect } from "react";
import { FormFieldItem } from "./components";
import { CategoryOptions } from "./components/FormFieldItem/selectOptions";

type FilterType = {
  searchKey?: string;
  filters?: Record<string, Record<string, string | number>>;
  sorter?: Record<string, "asc" | "desc">;
};

export interface FilterProp {
  initParams?: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  setTimestamp: Dispatch<SetStateAction<number>>;
}

export const Filter: FC<FilterProp> = ({
  setFilter,
  setTimestamp,
  initParams,
}) => {
  const { LanguageText } = useLanguageContext<"Contact">();
  return <div>{LanguageText.filterTitle}</div>;
};

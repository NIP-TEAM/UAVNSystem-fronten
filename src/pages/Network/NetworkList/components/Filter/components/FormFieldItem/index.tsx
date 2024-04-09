import { useLanguageContext } from "@/hooks";
import { Flex, Select } from "antd";
import {
  CSSProperties,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CategoryOptions,
  categoryOptions,
  contentOptions,
  quantifierOptions,
} from "./selectOptions";
import { useGetUsers } from "@/service";
import { userAtom } from "@/store";
import { AppContext } from "@/App";
import { useAtomValue } from "jotai";

interface FormFieldItemProp {}

const fieldInputStyle: CSSProperties = {
  width: "20%",
};

export const FormFieldItem: FC<FormFieldItemProp> = () => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Network">();
  const [catagorySelect, setCatagorySelect] = useState<CategoryOptions>();

  const { userInfo } = useAtomValue(userAtom);
  const {
    fetchData: fetchUsersData,
    error: usersError,
    data: usersData,
    code: usersCode,
  } = useGetUsers();
  useEffect(() => {
    fetchUsersData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (usersError) messageApi?.error(usersError);
  }, [messageApi, usersError]);
  const creatorsOptions = useMemo(() => {
    if (usersCode === 200 && usersData?.data)
      return usersData.data.map(({ name, id }) => ({
        label: name === userInfo?.name ? "<< ME >>" : name,
        value: id,
      }));
    return [];
  }, [userInfo?.name, usersCode, usersData?.data]);

  return (
    <Flex align="center" gap={5} style={{ width: "100%" }}>
      <Select
        style={fieldInputStyle}
        value={catagorySelect}
        onSelect={(newValue) => setCatagorySelect(newValue)}
        options={categoryOptions.map(({ labelKey, ...rest }) => ({
          label: LanguageText[labelKey],
          ...rest,
        }))}
      />
      <Select
        style={fieldInputStyle}
        options={quantifierOptions[
          catagorySelect || CategoryOptions.CREATOR
        ].map(({ labelKey, ...rest }) => ({
          label: LanguageText[labelKey],
          ...rest,
        }))}
      />
      <Select
        style={fieldInputStyle}
        options={
          catagorySelect === CategoryOptions.CREATOR
            ? creatorsOptions
            : contentOptions[catagorySelect || CategoryOptions.STATUS].map(
                ({ labelKey, value }) => ({
                  label: LanguageText[labelKey],
                  value,
                })
              )
        }
      />
      <div>{catagorySelect === CategoryOptions.CREATOR}</div>
    </Flex>
  );
};

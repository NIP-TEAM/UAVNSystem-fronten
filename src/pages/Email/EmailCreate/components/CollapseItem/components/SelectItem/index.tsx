import { useEmailCreateGlobalContext } from "@/pages/Email/EmailCreate/hooks";
import { ContactDataType, useGetContacts } from "@/service";
import {
  Form,
  FormItemProps,
  Select,
  SelectProps,
  Spin,
  Tabs,
  TabsProps,
  Tooltip,
  theme,
} from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import StickyBox from "react-sticky-box";

export interface SelectItemProp extends FormItemProps {}

export const SelectItem: FC<SelectItemProp> = ({ ...formItemProps }) => {
  const {
    dataSet: { contactListsData },
    loadingSet: { contactListsDataLoading },
  } = useEmailCreateGlobalContext();

  const [activeTabKey, setActiveTabKey] = useState(
    contactListsData?.[0]?.key || "-1"
  );

  // get contactList
  const {
    fetchData: fetchContacts,
    data: contactsDataData,
    loading: contactsLoading,
    code: contactsCode,
  } = useGetContacts(Number(activeTabKey), {
    pagination: { current: 1, pageSize: 100000, total: 100000 },
    filter: "",
  });
  useEffect(() => {
    fetchContacts?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabKey]);
  const contactsData = useMemo<ContactDataType[]>(() => {
    if (contactsCode === 200 && contactsDataData?.data)
      return contactsDataData?.data;
    return [];
  }, [contactsDataData?.data, contactsCode]);

  const options = useMemo<SelectProps["options"]>(
    () =>
      contactsData.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [contactsData]
  );

  const handleFilter: SelectProps["filterOption"] = (input, option) =>
    !!(
      option?.label?.toString().toLowerCase().includes(input) ||
      contactsData
        .find(({ id }) => id === option?.value)
        ?.email?.includes(input)
    );

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );

  const dropdownRender: SelectProps["dropdownRender"] = (options) => (
    <Spin spinning={contactListsDataLoading}>
      <Tabs
        renderTabBar={renderTabBar}
        items={contactListsData?.map((item) => ({
          ...item,
          children:
            !contactListsDataLoading && contactsLoading ? (
              <Spin style={{ margin: "auto", width: "100%" }} />
            ) : (
              options
            ),
        }))}
        onChange={(newValue) => setActiveTabKey(newValue)}
      />
    </Spin>
  );

  const labelRender: SelectProps["labelRender"] = ({ label, value }) => (
    <Tooltip
      title={contactsData.find(({ id }) => id === value)?.email || "error"}
    >
      {label}
    </Tooltip>
  );

  return (
    <Form.Item {...formItemProps}>
      <Select
        mode="multiple"
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        maxTagCount="responsive"
        dropdownRender={dropdownRender}
        labelRender={labelRender}
        options={options}
        loading={!contactListsDataLoading && contactsLoading}
        filterOption={handleFilter}
      />
    </Form.Item>
  );
};

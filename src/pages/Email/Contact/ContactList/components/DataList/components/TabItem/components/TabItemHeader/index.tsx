import { ContactListDataType, useGetContactList } from "@/service";
import { Collapse, CollapseProps, Spin } from "antd";
import { FC, useEffect, useMemo } from "react";
import { CollapseHeader } from "./components";
import { useFormateTitle } from "./hooks";

export interface TabItemHeaderProp {
  contactListId: number;
}

export const TabItemHeader: FC<TabItemHeaderProp> = ({ contactListId }) => {
  const requestCheck = contactListId !== -1 && contactListId !== -2;

  // get contact list detail
  const {
    fetchData: fetchContactList,
    data: contactListDataData,
    code: contactListCode,
    loading: contactListLoading,
  } = useGetContactList(contactListId);
  useEffect(() => {
    if (requestCheck) fetchContactList?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const contactListInfo = useMemo<Partial<ContactListDataType>>(() => {
    if (contactListCode === 200 && contactListDataData?.data)
      return contactListDataData.data;
    return {};
  }, [contactListDataData?.data, contactListCode]);

  const collapseItem: CollapseProps["items"] = [
    {
      key: "header",
      label: (
        <CollapseHeader
          refresh={fetchContactList}
          id={contactListId}
          name={useFormateTitle(contactListId, contactListInfo.name)}
          requestCheck={requestCheck}
        />
      ),
      showArrow: false,
      children: <>111</>,
      collapsible: requestCheck ? undefined : "disabled",
    },
  ];

  return (
    <Spin spinning={contactListLoading}>
      <Collapse ghost items={collapseItem} />
    </Spin>
  );
};

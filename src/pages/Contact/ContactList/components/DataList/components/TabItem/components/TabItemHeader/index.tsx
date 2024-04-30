import { AppContext } from "@/App";
import { ContactListDataType, useGetContactList } from "@/service";
import { Collapse, CollapseProps, Typography } from "antd";
import { FC, useContext, useEffect, useMemo } from "react";

export interface TabItemHeaderProp {
  contactListId: number;
}

export const TabItemHeader: FC<TabItemHeaderProp> = ({ contactListId }) => {
  const { messageApi } = useContext(AppContext)
  const requestCheck = contactListId !== -1 && contactListId !== -2

  // get contact list detail
  const {
    fetchData: fetchContactList,
    data: contactListDataData,
    error: contactListError,
    code: contactListCode,
    loading: contactListLoading
  } = useGetContactList(contactListId)
  useEffect(() => {
    if (requestCheck) fetchContactList?.()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (contactListError) messageApi?.error(contactListError)
  }, [contactListError, messageApi])
  const contactListInfo = useMemo<ContactListDataType | undefined>(() => {
    if (contactListCode === 200 && contactListDataData?.data) return contactListDataData.data
  }, [contactListDataData?.data, contactListCode])

  const collapseItem: CollapseProps["items"] = [
    {
      key: 'header',
      label: <Typography.Text strong>111</Typography.Text>,
      showArrow: false,
      children: <>111</>,
    }
  ]

  return (
    <Collapse ghost items={collapseItem} />
  );
};

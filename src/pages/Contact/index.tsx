import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { SessionKeys, getSessionStorageUtil } from "@/utils";
import { Spin, Typography } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DataList, Filter, FilterProp } from "./components";
import { ContactListDataType, useGetContactList } from "@/service";
import { AppContext } from "@/App";

interface ContactProp {}

const sessionKey = SessionKeys.CONTACTLIST;
type ControllerType = FilterProp["initParams"];

export const Contact: FC<ContactProp> = () => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();
  const [dataController, setDataController] = useState(
    getSessionStorageUtil<ControllerType>(sessionKey) || {
      creatorIds: [],
      searchKey: "",
    }
  );
  const [timestamp, setTimestamp] = useState(0);

  // contactListData
  const {
    fetchData: fetchContactList,
    code: contactListCode,
    error: contactListError,
    data: contactListDataData,
    loading: contactListLoading,
  } = useGetContactList({
    creatorIds: JSON.stringify(dataController?.creatorIds || []),
    searchKey: dataController?.searchKey || "",
  });
  useEffect(() => {
    if (contactListError) messageApi?.error(contactListError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactListError]);
  const contactListData = useMemo<ContactListDataType[]>(() => {
    if (contactListCode === 200 && contactListDataData?.data)
      return contactListDataData.data;
    return [];
  }, [contactListCode, contactListDataData?.data]);
  useEffect(() => {
    fetchContactList?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchContactList?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestamp]);

  const checkTabDisabled = (): boolean => !!dataController.creatorIds?.length;

  return (
    <BasicCard>
      <Typography.Title level={4}>{LanguageText.emailTitle}</Typography.Title>
      <Filter {...{ setTimestamp, setDataController }} />
      <Spin spinning={contactListLoading}>
        <DataList {...{ contactListData, checkTabDisabled }} />
      </Spin>
    </BasicCard>
  );
};

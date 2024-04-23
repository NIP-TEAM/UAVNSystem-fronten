import { ContactDataType } from "@/service/Email";
import { Table } from "antd";
import { FC } from "react";
import { TabItemHeaderProp, TabItemHeader } from "./components";

export interface TabItemProp extends TabItemHeaderProp {
  contacts: ContactDataType[];
}

export const TabItem: FC<TabItemProp> = ({ contactListId, contacts }) => {
    console.log(contacts)
  return (
    <div style={{ padding: 5 }}>
      <TabItemHeader {...{contactListId}} />
      <Table dataSource={contacts} />
    </div>
  );
};

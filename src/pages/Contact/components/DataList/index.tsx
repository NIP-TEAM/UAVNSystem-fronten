import { ContactListDataType } from "@/service/Email";
import { Tabs, TabsProps, theme } from "antd";

import { FC, useMemo } from "react";
import StickyBox from "react-sticky-box";
import { TabItem } from "./components/TabItem/TabItem";

export interface DataListProp {
  contactList: ContactListDataType[];
}

export const DataList: FC<DataListProp> = ({ contactList }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );
  const items = useMemo<TabsProps["items"]>(
    () =>
      contactList.map(({ id, name, contactList }) => ({
        label: name,
        key: id.toString(),
        children: <TabItem contactListId={id} contacts={contactList} />,
      })),
    [contactList]
  );

  return <Tabs renderTabBar={renderTabBar} items={items} />;
};

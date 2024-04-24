
import { Tabs, TabsProps, theme } from "antd";
import { FC, useMemo } from "react";
import StickyBox from "react-sticky-box";
import { TabItem } from "./components/TabItem";
import { ContactListDataType } from "@/service";

export interface DataListProp {
  contactListData: ContactListDataType[];
}

export const DataList: FC<DataListProp> = ({ contactListData }) => {
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
      contactListData.map(({ id, name }) => ({
        label: name,
        key: id.toString(),
        children: <TabItem contactListId={id} />,
      })),
    [contactListData]
  );

  return <Tabs renderTabBar={renderTabBar} items={items} />;
};

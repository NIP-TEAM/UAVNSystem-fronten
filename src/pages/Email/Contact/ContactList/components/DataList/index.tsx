import { Tabs, TabsProps, theme } from "antd";
import { FC, useMemo } from "react";
import StickyBox from "react-sticky-box";
import { useLanguageContext } from "@/hooks";
import {
  NewContactListModal,
  NewContactListModalProp,
  TabItem,
} from "./components";
import { useContactGlobalContext } from "../../hooks";

export interface DataListProp extends NewContactListModalProp {}

export const DataList: FC<DataListProp> = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { LanguageText } = useLanguageContext<"Contact">();
  const { contactListData } = useContactGlobalContext();
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );

  const items = useMemo<TabsProps["items"]>(
    () =>
      [
        { id: -1, name: LanguageText.allLabel },
        ...contactListData,
        { id: -2, name: LanguageText.otherLabel },
      ].map(({ id, name }) => ({
        label: name,
        key: id.toString(),
        children: <TabItem contactListId={id} />,
      })),
    [LanguageText.allLabel, LanguageText.otherLabel, contactListData]
  );

  return (
    <Tabs
      tabBarExtraContent={<NewContactListModal />}
      renderTabBar={renderTabBar}
      items={items}
    />
  );
};

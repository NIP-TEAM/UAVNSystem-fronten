import { Tabs, TabsProps, theme } from "antd";
import { FC, useMemo } from "react";
import StickyBox from "react-sticky-box";
import { TabItem } from "./components/TabItem";
import { ContactListDataType } from "@/service";
import { useLanguageContext } from "@/hooks";
import { NewContactListModal, NewContactListModalProp } from "./components";

export interface DataListProp extends NewContactListModalProp {
  contactListData: ContactListDataType[];
}

export const DataList: FC<DataListProp> = ({
  contactListData,
  setTimestamp,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { LanguageText } = useLanguageContext<"Contact">();
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );
  const items = useMemo<TabsProps["items"]>(
    () => [
      {
        label: LanguageText.allLabel,
        key: "-1",
        children: <TabItem contactListId={-1} />,
      },
      ...contactListData.map(({ id, name }) => ({
        label: name,
        key: id.toString(),
        children: <TabItem contactListId={id} />,
      })),
      {
        label: LanguageText.otherLabel,
        key: "-2",
        children: <TabItem contactListId={-2} />,
      },
    ],
    [LanguageText.allLabel, LanguageText.otherLabel, contactListData]
  );

  return (
    <Tabs
      tabBarExtraContent={<NewContactListModal {...{ setTimestamp }} />}
      renderTabBar={renderTabBar}
      items={items}
    />
  );
};

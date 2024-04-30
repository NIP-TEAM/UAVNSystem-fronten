import { Tabs, TabsProps, theme } from "antd";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import StickyBox from "react-sticky-box";
import { ContactListDataType } from "@/service";
import { useLanguageContext } from "@/hooks";
import {
  NewContactListModal,
  NewContactListModalProp,
  TabItem,
  TabItemProp,
} from "./components";
import { BasicPagination } from "@/types";

export interface DataListProp extends NewContactListModalProp {
  contactListData: ContactListDataType[];
  controller: TabItemProp["controller"];
  setPagination: Dispatch<SetStateAction<BasicPagination>>;
}

export const DataList: FC<DataListProp> = ({ contactListData, controller }) => {
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
    () =>
      [
        { id: -1, name: LanguageText.allLabel },
        ...contactListData,
        { id: -2, name: LanguageText.otherLabel },
      ].map(({ id, name }) => ({
        label: name,
        key: id.toString(),
        children: <TabItem contactListId={id} controller={controller} />,
      })),
    [
      LanguageText.allLabel,
      LanguageText.otherLabel,
      contactListData,
      controller,
    ]
  );

  return (
    <Tabs
      tabBarExtraContent={<NewContactListModal />}
      renderTabBar={renderTabBar}
      items={items}
    />
  );
};

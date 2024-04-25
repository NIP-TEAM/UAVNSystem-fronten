
import { Tabs, TabsProps, theme } from "antd";
import { FC, useMemo } from "react";
import StickyBox from "react-sticky-box";
import { TabItem } from "./components/TabItem";
import { ContactListDataType } from "@/service";
import { useLanguageContext } from "@/hooks";

export interface DataListProp {
  contactListData: ContactListDataType[];
  checkTabDisabled: () => boolean;
}

export const DataList: FC<DataListProp> = ({ contactListData, checkTabDisabled }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {LanguageText } = useLanguageContext<"Contact">()
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );
  const items = useMemo<TabsProps["items"]>(
    () =>
      [{
        label: LanguageText.allLabel,
        key: '-1',
        children: <TabItem contactListId={-1} />,
        disabled: checkTabDisabled()
      },
        ...contactListData.map(({ id, name }) => ({
          label: name,
          key: id.toString(),
          children: <TabItem contactListId={id} />,
        })),
        {
          label: LanguageText.otherLabel,
          key: '-2',
          children: <TabItem contactListId={-2} />,
        disabled: checkTabDisabled()
        }
      ],
    [contactListData]
  );

  return <Tabs renderTabBar={renderTabBar} items={items} />;
};

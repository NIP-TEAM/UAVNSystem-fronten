import { useLanguageContext } from "@/hooks";
import { useGetContactLists, useNetworkData } from "@/service";
import { SelectProps, TabsProps } from "antd";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";

const EmailCreateGlobalContext = createContext<{
  dataSet: Readonly<{
    networksData: SelectProps["options"];
    contactListsData: TabsProps["items"];
  }>;
  loadingSet: Readonly<{
    networksDataLoading: boolean;
    contactListsDataLoading: boolean;
  }>;
  refreshSet: Readonly<{
    networksDataRefresh?: () => void;
    contactListsDataRefresh?: () => void;
  }>;
}>({
  dataSet: {
    networksData: [],
    contactListsData: [],
  },
  loadingSet: {
    networksDataLoading: false,
    contactListsDataLoading: false,
  },
  refreshSet: {
    networksDataRefresh: () => {},
    contactListsDataRefresh: () => {},
  },
});

export const EmailCreateGlobalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { LanguageText } = useLanguageContext<"CreateEmail">();

  // contactLists Data
  const {
    fetchData: fetchContactListsData,
    data: contactListsDataData,
    code: contactListsCode,
    loading: contactListsDataLoading,
  } = useGetContactLists();
  const contactListsData = useMemo<TabsProps["items"]>(() => {
    if (contactListsCode === 200 && contactListsDataData?.data)
      return [
        { label: LanguageText.allLabel, key: '-1'},
        ...contactListsDataData.data.map(({ id, name }) => ({
          label: name,
          key: id.toString(),
        })),
        { label: LanguageText.otherLabel, key: '-2' },
      ];
    return [];
  }, [
    LanguageText.allLabel,
    LanguageText.otherLabel,
    contactListsCode,
    contactListsDataData?.data,
  ]);

  // networkList Data
  const {
    fetchData: fetchNetworksData,
    data: networksDataData,
    code: networksDataCode,
    loading: networksDataLoading,
  } = useNetworkData({
    pagination: { pageSize: 10000, current: 1, total: 10000 },
    filter: "",
    selectKeys: JSON.stringify(["id", "name"]),
  });
  const networksData = useMemo<SelectProps["options"]>(() => {
    if (networksDataCode === 200 && networksDataData?.data)
      return networksDataData?.data.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
    return [];
  }, [networksDataCode, networksDataData?.data]);

  //   init Data
  useEffect(() => {
    fetchContactListsData?.(), fetchNetworksData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EmailCreateGlobalContext.Provider
      value={{
        dataSet: {
          contactListsData,
          networksData,
        },
        loadingSet: {
          contactListsDataLoading,
          networksDataLoading,
        },
        refreshSet: {
          networksDataRefresh: fetchNetworksData,
          contactListsDataRefresh: fetchContactListsData,
        },
      }}
    >
      {children}
    </EmailCreateGlobalContext.Provider>
  );
};

export const useEmailCreateGlobalContext = () =>
  useContext(EmailCreateGlobalContext);

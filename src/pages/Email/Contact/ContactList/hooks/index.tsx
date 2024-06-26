import { AppContext } from "@/App";
import {
  ContactDataControllerType,
  ContactListDataType,
  useGetContactLists,
} from "@/service";
import { SessionKeys, getSessionStorageUtil } from "@/utils";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FilterType } from "../components/Filter/types";

const sessionKey = SessionKeys.CONTACTLIST;

type FiltersType = FilterType["filters"];

const ContactGlobalContext = createContext<{
  contactListLoading: boolean;
  fetchContactList?: () => void;
  contactListData: ContactListDataType[];
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
  searchKey: string;
  setSearchKey: Dispatch<SetStateAction<string>>;
  refreshContactFlag: number;
  setRefreshContactFlag: Dispatch<SetStateAction<number>>;
}>({
  contactListLoading: false,
  contactListData: [],
  filters: {},
  setFilters: () => {},
  searchKey: "",
  setSearchKey: () => {},
  refreshContactFlag: 0,
  setRefreshContactFlag: () => {},
});

export const ContactGlobalProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { messageApi } = useContext(AppContext);

  // contact controller about
  const [searchKey, setSearchKey] = useState(
    JSON.parse(
      getSessionStorageUtil<ContactDataControllerType>(sessionKey)?.filter ||
        "{}"
    )?.searchKey || ""
  );
  const [filters, setFilters] = useState(
    JSON.parse(
      getSessionStorageUtil<ContactDataControllerType>(sessionKey)?.filter ||
        "{}"
    )?.filters || ""
  );
  useEffect(() => {
    sessionStorage.removeItem(sessionKey);
  }, []);

  // contactListData
  const {
    fetchData: fetchContactList,
    code: contactListCode,
    error: contactListError,
    data: contactListDataData,
    loading: contactListLoading,
  } = useGetContactLists();
  useEffect(() => {
    if (contactListError) messageApi?.error(contactListError);
  }, [contactListError, messageApi]);
  const contactListData = useMemo<ContactListDataType[]>(() => {
    if (contactListCode === 200 && contactListDataData?.data)
      return contactListDataData.data;
    return [];
  }, [contactListCode, contactListDataData?.data]);
  useEffect(() => {
    fetchContactList?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [refreshContactFlag, setRefreshContactFlag] = useState(0);

  return (
    <ContactGlobalContext.Provider
      value={{
        fetchContactList,
        contactListData,
        contactListLoading,
        filters,
        setFilters,
        searchKey,
        setSearchKey,
        refreshContactFlag,
        setRefreshContactFlag,
      }}
    >
      {children}
    </ContactGlobalContext.Provider>
  );
};

export const useContactGlobalContext = () => useContext(ContactGlobalContext);

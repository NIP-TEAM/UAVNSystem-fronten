import { BasicPagination } from "@/types";
import { FC, ReactNode, createContext, useContext } from "react";

const ContactListContext = createContext<{
  contactListRefresh?: () => void;
  pagination: BasicPagination;
}>({
  pagination: {
    current: -1,
    pageSize: -10,
    total: -10,
  },
});

export const ContactListDataControllerProvider: FC<{
  children: ReactNode;
  contactListRefresh: () => void;
  pagination: BasicPagination;
}> = ({ children, contactListRefresh, pagination }) => {
  return (
    <ContactListContext.Provider
      value={{
        contactListRefresh,
        pagination,
      }}
    >
      {children}
    </ContactListContext.Provider>
  );
};

export const useControllerContext = () => useContext(ContactListContext);

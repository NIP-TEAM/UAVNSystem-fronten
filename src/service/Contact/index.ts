import { useHttp } from "@/hooks";
import { BasicPagination } from "@/types";

interface BasicMetaType {
    pagination: BasicPagination;
  }
  
  export type ContactDataType = {
    name: string;
    id: number;
    phone: string;
    email: string;
    note: string;
    createdAt: string;
    updatedAt: string;
    creator: {
      name: string;
      id: number;
    };
    updator: {
      name: string;
      id: string;
    };
  };
  
  export type ContactListDataType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    creator: {
      name: string;
      id: number;
    };
    updator: {
      name: string;
      id: number;
    };
    networkInfo: { name: string; id: number }[];
  };
  
  export type ContactListDataControllerType = {
    creatorIds: string,
    searchKey: string,
  };
  
  export const useGetContactList = (data: ContactListDataControllerType) =>
    useHttp<ContactListDataType[]>({
      url: "/contact",
      method: "get",
      data,
    });
  
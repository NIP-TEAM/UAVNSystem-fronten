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
    id: string;
  };
  networkInfo: { name: string; id: number }[];
  contactList: ContactDataType[];
};

export type DataControllerType = {
  pagination: BasicPagination;
  filter: string;
  selectKeys?: string;
};

export const useGetContactList = (data: DataControllerType) =>
  useHttp<ContactDataType, BasicMetaType>({
    url: "/email",
    method: "get",
    data,
  });

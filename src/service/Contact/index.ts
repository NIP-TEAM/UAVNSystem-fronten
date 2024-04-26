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


export const useGetContactList = () =>
  useHttp<ContactListDataType[]>({
    url: "/contact",
    method: "get",
  });

export type ContactDataControllerType = {
  pagination: BasicPagination;
  filters: string;
};

export const useGetContact = (id: number, data: ContactDataControllerType) =>
  useHttp<ContactDataType, BasicMetaType>({
    url: "/contact/" + id,
    method: "get",
    data,
  });

import { useHttp } from "@/hooks";
import { BasicPagination } from "@/types";
import { Key } from "react";

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
  contactListIds: number[];
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

export const useGetContactLists = () =>
  useHttp<ContactListDataType[]>({
    url: "/contact/contactlist",
    method: "get",
  });

export const useGetContactList = (id: number) =>
  useHttp<ContactListDataType>({
    url: "/contact/contactlist/info/" + id,
    method: "get",
  });

export type ContactDataControllerType = {
  pagination: BasicPagination;
  filter: string;
};

export const useGetContacts = (id: number, data: ContactDataControllerType) =>
  useHttp<ContactDataType[], BasicMetaType>({
    url: "/contact/contactlist/" + id,
    method: "get",
    data,
  });

export const useCreateContactList = (data: { name: string }) =>
  useHttp({
    url: "/contact/contactlist",
    method: "post",
    data,
  });

export const useCreateContacts = (data: Partial<ContactDataType>[]) =>
  useHttp({
    url: "/contact",
    method: "post",
    data,
  });

export const useDeleteContact = (data: Key[]) => useHttp({
  url: "/contact/",
  method: 'delete',
  data,
})

export interface DeleteContactListController {
  deleteContact?: boolean
}

export const useDeleteContactList = (id: number, data: DeleteContactListController)  => useHttp({
  url: '/contact/contactlist/' + id,
  method: "delete",
  data,
})

  export const useUpdateContactList = (id: number, data: Partial<ContactDataType>) => useHttp({
    url: '/contact/contactlist/' + id,
    method: "patch",
    data,
  })
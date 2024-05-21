import { useHttp } from "@/hooks"
import { BasicMetaType, BasicPagination } from "@/types";

export type EmailControllerType = {
    pagination: BasicPagination;
    filter: string;
    selectKeys?: string;
  };

export interface EmailDataType {
    id: number,
    name: string,
    number: string,
    networkId: number,
    network: {name: string, id: number},
    creator: {id: number, name: string}
    targetEmail: string[],
    contactIds: number[],
    contacts: {name: string, email: string}[],
    condition: {[key: string]: unknown}
    createAt: string,
    onSchedule: boolean,
    updateAt: string,
}

export const useCreateEmail = (data: Partial<EmailDataType>[]) => useHttp({
    url: '/email',
    method: 'post',
    data,
})

export const useGetEmails = (data: EmailControllerType) => useHttp<EmailDataType[], BasicMetaType>({
    url: '/email',
    method: "get",
    data
})

export const useGetEmail = (id: number) => useHttp<EmailDataType>({
    url: "/email/" + id,
    method: "get"
})

export const useDeleteEmail = (id: number) => useHttp({
    url: "/email/" + id,
    method: 'delete'
})

export const useHandleSchedule = (id: number) => useHttp({
    url: '/email/schedule/' + id,
    method: 'get',
})
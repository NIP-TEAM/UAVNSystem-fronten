import { useHttp } from "@/hooks"

export interface EmailDataType {
    id: number,
    name: string,
    number: string,
    networkId: number,
    network: {name: string, id: number},
    creator: {id: number, name: string}
    targetEmail: string[],
    contactIds: number[],
    condition: {[key: string]: unknown}
    createAt: string
}

export const useCreateEmail = (data: Partial<EmailDataType>[]) => useHttp({
    url: '/email',
    method: 'post',
    data,
})
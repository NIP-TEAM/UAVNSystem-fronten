import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export interface UserProtocol {
    token: string
    userInfo: UserInfo
}

export interface UserInfo {
    id: string
    name: string
    active: boolean
    email: string
    lastLogin: number
}

type PartialUserProtocol = Partial<UserProtocol>

const userCoreAtom = atomWithStorage<PartialUserProtocol>('user-about', {
    // token: 'adfafdadsfadfa',
    // userInfo: {
    //     name: 'local data',
    //     id: 'fadfadf',
    //     active: true,
    //     email: 'test@test.com',
    //     lastLogin: new Date().getTime(),
    // }
}, undefined, {
    getOnInit: true
})

export const userAtom = atom(
    (get) => get(userCoreAtom),
    (get, set, newValue: PartialUserProtocol) => set(userCoreAtom, {...get(userCoreAtom), ...newValue})
)
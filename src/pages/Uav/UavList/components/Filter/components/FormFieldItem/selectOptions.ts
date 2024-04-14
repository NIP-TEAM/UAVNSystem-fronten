import { TextKeys } from "@/hooks";

export enum CategoryOptions {
    STATUS = 'status',
    CREATOR = 'creator',
}

type CostumeOptionsType<T> = ReadonlyArray<{labelKey: TextKeys<"Uav">, value: T }>

export const categoryOptions: CostumeOptionsType<CategoryOptions> = [
    {labelKey: "creatorFieldTitle", value: CategoryOptions.CREATOR},
    {labelKey: "statusFieldTitle", value: CategoryOptions.STATUS}
]

export const quantifierOptions: Readonly<Record<CategoryOptions, CostumeOptionsType<string>>> = {
    [CategoryOptions.STATUS]: [
        {labelKey: "isQuantifier", value: 'is'},
        {labelKey: "isNotQuantifier", value: "isNot"}
    ],
    [CategoryOptions.CREATOR]: [
        {labelKey: "isQuantifier", value: 'is'},
        {labelKey: "isNotQuantifier", value: "isNot"}
    ]
}

export const contentOptions: Readonly<Record<CategoryOptions, CostumeOptionsType<number>>> = {
    [CategoryOptions.CREATOR]: [],
    [CategoryOptions.STATUS]: [
        {labelKey: "initStatus", value: 1},
        {labelKey: "doneStatus", value: 2},
        {labelKey: "errorStatus", value: 3}
    ]
}
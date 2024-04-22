import { TextKeys } from "@/hooks";

export enum CategoryOptions {
  STATUS = "status",
  CREATOR = "creator",
  UAVS = "uavs",
  CONNECTMAP = "connectMap",
}

type CostumeOptionsType<T> = ReadonlyArray<{
  labelKey: TextKeys<"Network">;
  value: T;
}>;

export const categoryOptions: CostumeOptionsType<CategoryOptions> = [
  { labelKey: "creatorFieldTitle", value: CategoryOptions.CREATOR },
  { labelKey: "statusFieldTitle", value: CategoryOptions.STATUS },
  { labelKey: "uavsFieldTitle", value: CategoryOptions.UAVS },
  { labelKey: "connectMapFieldTitle", value: CategoryOptions.CONNECTMAP },
];

export const quantifierOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<string>>
> = {
  [CategoryOptions.STATUS]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
  [CategoryOptions.CREATOR]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
  [CategoryOptions.UAVS]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
  [CategoryOptions.CONNECTMAP]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
};

export const contentOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<number | string>>
> = {
  [CategoryOptions.CREATOR]: [],
  [CategoryOptions.STATUS]: [
    { labelKey: "initStatus", value: 1 },
    { labelKey: "doneStatus", value: 2 },
    { labelKey: "errorStatus", value: 3 },
  ],
  [CategoryOptions.UAVS]: [{ labelKey: "uavEmptyText", value: "empty" }],
  [CategoryOptions.CONNECTMAP]: [
    { labelKey: "connectEmptyText", value: "empty" },
  ],
};

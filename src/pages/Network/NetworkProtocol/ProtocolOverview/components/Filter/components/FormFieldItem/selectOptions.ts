import { TextKeys } from "@/hooks";

export enum CategoryOptions {
  CREATOR = "creator",
  DEFAUlT = "isDefault"
}

type CostumeOptionsType<T> = ReadonlyArray<{
  labelKey: TextKeys<"NetworkProtocol">;
  value: T;
}>;

export const categoryOptions: CostumeOptionsType<CategoryOptions> = [
  { labelKey: "creatorFieldTitle", value: CategoryOptions.CREATOR },
  { labelKey: "defaultFieldTitle", value: CategoryOptions.DEFAUlT },
];

export const quantifierOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<string>>
> = {
  [CategoryOptions.CREATOR]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
  [CategoryOptions.DEFAUlT]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
};

export const contentOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<number | string>>
> = {
  [CategoryOptions.CREATOR]: [],
  [CategoryOptions.DEFAUlT]: [
    { labelKey: "isDefualtText", value: 1 },
    { labelKey: "notDefualtText", value: 2 }],
};

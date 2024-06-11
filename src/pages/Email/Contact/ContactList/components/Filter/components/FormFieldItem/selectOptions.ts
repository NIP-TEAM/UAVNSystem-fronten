import { TextKeys } from "@/hooks";

export enum CategoryOptions {
  CREATOR = "creator",
  PHONE = "phone",
}

type CostumeOptionsType<T> = ReadonlyArray<{
  labelKey: TextKeys<"Contact">;
  value: T;
}>;

export const categoryOptions: CostumeOptionsType<CategoryOptions> = [
  { labelKey: "creatorFieldTitle", value: CategoryOptions.CREATOR },
  { labelKey: "phoneFieldTitle", value: CategoryOptions.PHONE },
];

export const quantifierOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<string>>
> = {
  [CategoryOptions.CREATOR]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
  [CategoryOptions.PHONE]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
};

export const contentOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<number | string>>
> = {
  [CategoryOptions.CREATOR]: [],
  [CategoryOptions.PHONE]: [{ labelKey: "phoneEmptyText", value: "empty" }],
};

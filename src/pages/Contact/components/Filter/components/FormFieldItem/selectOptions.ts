import { TextKeys } from "@/hooks";

export enum CategoryOptions {
  CREATOR = "creator",
}

type CostumeOptionsType<T> = ReadonlyArray<{
  labelKey: TextKeys<"Network">;
  value: T;
}>;

export const categoryOptions: CostumeOptionsType<CategoryOptions> = [
  { labelKey: "creatorFieldTitle", value: CategoryOptions.CREATOR },
];

export const quantifierOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<string>>
> = {
  [CategoryOptions.CREATOR]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
};

export const contentOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<number | string>>
> = {
  [CategoryOptions.CREATOR]: [],
};

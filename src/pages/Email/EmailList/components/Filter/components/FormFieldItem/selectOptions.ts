import { TextKeys } from "@/hooks";

export enum CategoryOptions {
  CREATOR = "creator",
  SCHEDULE = "onSchedule",
}

type CostumeOptionsType<T> = ReadonlyArray<{
  labelKey: TextKeys<"Email">;
  value: T;
}>;

export const categoryOptions: CostumeOptionsType<CategoryOptions> = [
  { labelKey: "creatorFieldTitle", value: CategoryOptions.CREATOR },
  { labelKey: "scheduleFieldTitle", value: CategoryOptions.SCHEDULE },
];

export const quantifierOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<string>>
> = {
  [CategoryOptions.CREATOR]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
  [CategoryOptions.SCHEDULE]: [
    { labelKey: "isQuantifier", value: "is" },
    { labelKey: "isNotQuantifier", value: "isNot" },
  ],
};

export const contentOptions: Readonly<
  Record<CategoryOptions, CostumeOptionsType<number | string | boolean>>
> = {
  [CategoryOptions.CREATOR]: [],
  [CategoryOptions.SCHEDULE]: [
    { labelKey: "scheduleIsRunning", value: false },
    { labelKey: "scheduleIsRunning", value: true },
  ],
};

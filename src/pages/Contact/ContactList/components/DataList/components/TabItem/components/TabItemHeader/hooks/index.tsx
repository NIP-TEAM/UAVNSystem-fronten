import { useLanguageContext } from "@/hooks";

export const useFormateTitle = (id: number, name?: string): string => {
  const { LanguageText } = useLanguageContext<"Contact">();

  switch (id) {
    case -1:
      return LanguageText.allTitle;
    case -2:
      return LanguageText.otherTitle;

    default:
      return name || "";
  }
};

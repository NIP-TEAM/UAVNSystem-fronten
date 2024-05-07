import { useLanguageContext } from "@/hooks";
import { useGetContact } from "@/service";
import { Button, Drawer } from "antd";
import { FC, useState } from "react";

export interface AsideDrawerProp {
  id: number;
}

export const AsideDrawer: FC<AsideDrawerProp> = ({ id }) => {
  const { LanguageText } = useLanguageContext<"Contact">();

  const [open, setOpen] = useState(false);

  //   contact detail
  const {
    fetchData: fetchContact,
    code: contactCode,
    error: contactError,
    loading: contactLoading,
    data: contactDataData,
  } = useGetContact(id);

  return (
    <>
      <Button type="link" onClick={() => setOpen(true)}>
        {LanguageText.toDetailTitle}
      </Button>
      <Drawer open={open} loading={contactLoading}>111</Drawer>
    </>
  );
};

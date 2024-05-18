import { BasicCard } from "@/components";
import { FC } from "react";
import { DataList, Filter, Header } from "./components";
import { ContactGlobalProvider } from "./hooks";

interface ContactProp {}

export const Contact: FC<ContactProp> = () => (
  <ContactGlobalProvider>
    <BasicCard>
      <Header />
      <Filter />
      <DataList />
    </BasicCard>
  </ContactGlobalProvider>
);

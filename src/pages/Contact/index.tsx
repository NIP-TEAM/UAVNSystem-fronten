import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { ContactListDataType } from "@/service/Email";
import { SessionKeys, getSessionStorageUtil } from "@/utils";
import { Typography } from "antd";
import { FC, useState } from "react";
import { FilterType } from "../Network/NetworkList/types";
import { DataList, Filter } from "./components";

interface EmailProp {}

// export type ContactListDataType = {
//     id: number;
//     name: string;
//     createdAt: string;
//     updatedAt: string;
//     creator: {
//       name: string;
//       id: number;
//     };
//     updator: {
//       name: string;
//       id: string;
//     };
//     networkInfo: { name: string; id: number }[];
//     contactList: ContactDataType[];
//   };

interface StorageProtocol {
  searchKey: string;
  filter: FilterType;
}

const contactList: ContactListDataType[] = [
  {
    id: 1,
    name: "test",
    createdAt: "1",
    updatedAt: new Date().getTime().toString(),
    creator: {
      name: "test",
      id: 1,
    },
    updator: {
      name: "test",
      id: 1,
    },
    networkInfo: [{ name: "1", id: 1 }],
    contactList: [],
    _count: {
      networkInfo: 1,
      contactList: 0,
    },
  },
];

const sessionKey = SessionKeys.EMAIL;

export const Contact: FC<EmailProp> = () => {
  const { LanguageText } = useLanguageContext<"Contact">();
  const [filter, setFilter] = useState<FilterType>(
    getSessionStorageUtil<StorageProtocol>(sessionKey)?.filter || {}
  );

  const [timestamp, setTimestamp] = useState(0);

  return (
    <BasicCard>
      <Typography.Title level={4}>{LanguageText.emailTitle}</Typography.Title>
      <Filter {...{setTimestamp, setFilter}} />
      <DataList {...{contactList}}/>
    </BasicCard>
  );
};

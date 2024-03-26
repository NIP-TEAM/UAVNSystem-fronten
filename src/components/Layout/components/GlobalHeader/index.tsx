import { Avatar, Button, Flex, Layout, Typography } from "antd";
import { FC } from "react";
import { HeaderStyle } from "./style";
import { LanguageSwitch } from "../../..";
import {
  MoonFilled,
  SunOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "../../../../store";
import { THEMESNAME, themeAtom } from "../../../../store/Theme";

interface GlobalHeaderProp {}

export const GlobalHeader: FC<GlobalHeaderProp> = () => {
  const { userInfo: { name } = { name: "" } } = useAtomValue(userAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <Layout.Header style={HeaderStyle}>
      <Flex style={{ width: "100%" }} gap={15} justify="end" align="center">
        <Button
          type="text"
          icon={theme === THEMESNAME.light ? <MoonFilled /> : <SunOutlined />}
          onClick={setTheme}
        />
        <LanguageSwitch>
          <Button
            type="link"
            icon={<TranslationOutlined />}
            title="Switch Language"
          />
        </LanguageSwitch>
        <Flex gap={5} align="center" onClick={() => console.log('111')} style={{cursor: 'pointer'}}>
          <Avatar icon={<UserOutlined />} />
          <Typography.Text>{name}</Typography.Text>
        </Flex>
      </Flex>
    </Layout.Header>
  );
};

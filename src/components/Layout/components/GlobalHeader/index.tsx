import { Avatar, Button, Flex, Layout, Typography } from "antd";
import { Dispatch, FC } from "react";
import { HeaderStyle } from "./style";
import { LanguageSwitch } from "../../..";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonFilled,
  SunOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "../../../../store";
import { THEMESNAME, themeAtom } from "../../../../store/Theme";interface GlobalHeaderProp {
  collapse: boolean;
  setCollapse: Dispatch<boolean>;
  background: string;
}

export const GlobalHeader: FC<GlobalHeaderProp> = ({
  setCollapse,
  collapse,
  background
}) => {
  const { userInfo: { name } = { name: "" } } = useAtomValue(userAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <Layout.Header style={{...HeaderStyle, background}}>
      <Flex style={{ width: "100%" }} justify="space-between" align="center">
        <Button
          type="text"
          icon={collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapse(!collapse)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Flex gap={15} style={{ padding: "0 1em" }}>
          <Button
            type="text"
            icon={theme === THEMESNAME.light ? <MoonFilled /> : <SunOutlined />}
            onClick={setTheme}
          />
          <LanguageSwitch>
            <Button
              type="text"
              icon={<TranslationOutlined />}
              title="Switch Language"
            />
          </LanguageSwitch>
          <Flex
            gap={5}
            align="center"
            onClick={() => console.log("111")}
            style={{ cursor: "pointer" }}
          >
            <Avatar icon={<UserOutlined />} />
            <Typography.Text>{name}</Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </Layout.Header>
  );
};

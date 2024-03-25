import { Layout } from "antd";
import { FC } from "react";
import { HeaderStyle } from "./style";

interface GlobalHeaderProp {}

export const GlobalHeader: FC<GlobalHeaderProp> = () => {
  return <Layout.Header style={HeaderStyle}>header</Layout.Header>;
};

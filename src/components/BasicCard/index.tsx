import { Card, CardProps } from "antd";
import { FC } from "react";

export interface BasicCardProp extends CardProps {}

export const BasicCard: FC<BasicCardProp> = ({ style, ...rest }) => (
  <Card {...{ style: { margin: "0 0.5em", ...style }, ...rest }} />
);

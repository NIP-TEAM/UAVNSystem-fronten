import { useContext } from "react";
import { ConfigContext } from "./ConfigContext";

export * from './ConfigContext'
export const useConfig = () => useContext(ConfigContext)
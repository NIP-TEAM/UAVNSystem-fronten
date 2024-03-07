import React from "react";

interface Config {
  token: string;
  apiBaseUrl: string;
  httpStrategy: (() => void)[];
  [key: string]: unknown;
}

type PartialConfig = Partial<Config>

export const ConfigContext = React.createContext<PartialConfig>({});

type ConfigProviderProps = {
  children: React.ReactNode;
  config?: PartialConfig;
};

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  config = {},
}) => (
  <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
);

import {
  createContext,
  useContext,
} from 'react'

interface Config {
  token: string
  httpStrategy: Record<number, () => void>
  [key: string]: unknown
}

type PartialConfig = Partial<Config>

export const ConfigContext = createContext<PartialConfig>({})

type ConfigProviderProps = {
  children: React.ReactNode;
  config?: PartialConfig;
};

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  config = {},
}) => <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>

export const useConfig = () => useContext(ConfigContext)

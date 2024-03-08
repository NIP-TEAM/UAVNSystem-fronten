import { message, ConfigProvider as AntdConfigProvider } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { createContext, useMemo } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ConfigProvider } from "./hooks";
import zhCN from "antd/locale/zh_CN";
import { AppLayout } from "./components";
import { pageTypes, routes } from "./router";
import { useAtomValue } from "jotai";
import { userAtom } from "./store";
export const AppContext = createContext<{ messageApi: MessageInstance | null }>(
  {
    messageApi: null,
  }
);

function App() {
  // message about
  const [messageApi, contextHolder] = message.useMessage();
  const appContextMemoValue = useMemo(
    () => ({
      messageApi,
    }),
    [messageApi]
  );

  // route about
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routeKey: string = pathname.split("/")[1];
  const memoPageType = useMemo(
    () => (pageTypes.noFrame.includes(routeKey) ? "noFrame" : "frame"),
    [routeKey]
  );

  // tokenAbout
  const { token } = useAtomValue(userAtom)
  const config = {
    401: () => {
      navigate('/login')
    },
    // TODO: 403处理
    403: () => console.log('error')
    
  }

  return (
    <AppContext.Provider value={appContextMemoValue}>
      {contextHolder}
      <ConfigProvider {...{config}}>
        <AntdConfigProvider
          locale={zhCN}
          theme={{
            components: {
              Tabs: {
                horizontalMargin: "0",
              },
            },
          }}
        >
          <AppLayout routes={routes} pageType={memoPageType}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    token || route.isPublic ? (
                      route.element
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              ))}
            </Routes>
          </AppLayout>
        </AntdConfigProvider>
      </ConfigProvider>
    </AppContext.Provider>
  );
}

export default App;

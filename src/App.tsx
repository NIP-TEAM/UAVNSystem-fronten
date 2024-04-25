import { message, ConfigProvider as AntdConfigProvider } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { createContext, useMemo } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  ANTDCOLORTHEME,
  ANTDLANGUAGETHEME,
  ConfigProvider,
  LanguageProvider,
} from "./hooks";
import { AppLayout } from "./components";
import { flatRoutes, pageTypes } from "./router";
import { useAtomValue } from "jotai";
import { languageAtom, userAtom } from "./store";
import { themeAtom } from "./store/Theme";
import { MyBreadcrumb } from "./components/Layout/components";

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
  const { pathname } = useLocation();
  const routeKey: string = pathname.split("/")[1];
  const memoPageType = useMemo(
    () => (pageTypes.noFrame.includes(routeKey) ? "noFrame" : "frame"),
    [routeKey]
  );

  // token
  const { token } = useAtomValue(userAtom);
  // language
  const language = useAtomValue(languageAtom);
  // theme
  const theme = useAtomValue(themeAtom);
  // context config
  const config = {
    token,
    language,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  };

  return (
    <AppContext.Provider value={appContextMemoValue}>
      {contextHolder}
      <ConfigProvider {...{ config }}>
        <AntdConfigProvider
          locale={ANTDLANGUAGETHEME[language]}
          theme={{
            components: {
              Tabs: {
                horizontalMargin: "0",
              },
            },
            algorithm: ANTDCOLORTHEME[theme],
          }}
        >
          <AppLayout pageType={memoPageType}>
            <Routes>
              {flatRoutes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    <LanguageProvider textKey={route.textKey || "Error"}>
                      {token || route.isPublic ? (
                        <>
                          {!route.breadcrumbForbidden &&
                            memoPageType !== "noFrame" && <MyBreadcrumb />}
                          {route.element}
                        </>
                      ) : (
                        <Navigate to="/login" />
                      )}
                    </LanguageProvider>
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

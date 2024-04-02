import { message, ConfigProvider as AntdConfigProvider } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { createContext, useMemo } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ANTDCOLORTHEME, ANTDLANGUAGETHEME, ConfigProvider } from "./hooks";
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
  const navigate = useNavigate();
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
    httpStrategy: {
      401: () => {
        navigate("/login");
      },
      // TODO: 403处理
      403: () => console.log("error"),
    },
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
                    token || route.isPublic ? (
                      <>
                        {!route.breadcrumbForbidden && memoPageType !== 'noFrame' && <MyBreadcrumb />}
                        {route.element}
                      </>
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

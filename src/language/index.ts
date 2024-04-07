export const LanguageTextJson = {
  Default: (await import("./core/Default.json")).default,
  Login: (await import("./pages/Login.json")).default,
  Register: (await import("./pages/Register.json")).default,
  Forget: (await import("./pages/Forget.json")).default,
  GlobalMenu: (await import("./core/GlobalMenu.json")).default,
  Network: (await import("./pages/Network.json")).default,
} as const;

export type LanguageJsonSet = keyof typeof LanguageTextJson;

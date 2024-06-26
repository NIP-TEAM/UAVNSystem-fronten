export const LanguageTextJson = {  Error: (await import("./core/Error.json")).default,
  NetworkStructure: (await import("./core/NetworkStructure.json")).default,
  Login: (await import("./pages/Login.json")).default,
  Register: (await import("./pages/Register.json")).default,
  Forget: (await import("./pages/Forget.json")).default,
  GlobalMenu: (await import("./core/GlobalMenu.json")).default,
  Dashboard: (await import("./pages/Dashboard.json")).default,
  Network: (await import("./pages/Network.json")).default,
  Uav: (await import("./pages/Uav.json")).default,
  NetworkDetail: (await import("./pages/NetworkDetail.json")).default,
  NetworkProtocol: (await import("./pages/NetworkProtocol.json")).default,
  Contact: (await import('./pages/Contact.json')).default,
  CreateContact: (await import('./pages/CreateContact.json')).default,
  User: (await import('./pages/User.json')).default,
  Email: (await import('./pages/Email.json')).default,
  CreateEmail: (await import('./pages/CreateEmail.json')).default,
  ProtocolEdit: (await import('./pages/ProtocolEdit.json')).default
} as const;

export type LanguageJsonSet = keyof typeof LanguageTextJson;

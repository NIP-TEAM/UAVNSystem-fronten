export enum SessionKeys {
  NETWORK = "network-filter",
  UAV = "uav-filter",
  CONTACTLIST = "contactList-filter",
  CREATEUAV = "create-uav",
  PROTOCOL = "protocol-filter",
  EMAILLIST = "email-list",
}

export const sessionStorageUtil = <T = unknown>(key: SessionKeys, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorageUtil = <T = unknown>(key: SessionKeys): T =>
  JSON.parse(sessionStorage.getItem(key) || "{}");

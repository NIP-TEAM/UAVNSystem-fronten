export enum SessionKeys {
  NETWORK = "network-filter",
  UAV = "uav-filter",
  CREATEUAV = "create-uav",
}

export const sessionStorageUtil = <T = unknown>(key: SessionKeys, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorageUtil = <T = unknown>(key: SessionKeys): T => {
  return JSON.parse(sessionStorage.getItem(key) || "{}");
};

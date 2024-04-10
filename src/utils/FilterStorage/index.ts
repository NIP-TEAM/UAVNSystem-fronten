export const filterSessionStorage = <T = unknown>(key: string, value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const getFilterSessionStorage = <T = unknown>(key: string): T => {
    return JSON.parse(sessionStorage.getItem(key) || '{}')
}
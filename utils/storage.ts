export function manageLocalStorage() {
    const removeLocalData = (key: string) => window.localStorage.removeItem(key);
    const getLocalData = (key: string) => {
        return JSON.parse(JSON.stringify(window.localStorage.getItem(key)));
    };
    const setLocalData = (key: string, value: object | object[] | string | string[]) => {
        window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    };
    return { getLocalData, setLocalData, removeLocalData };
}

interface HooksLocalStorage {
    get: Function;
    set: Function;
    state: any;
}
/**
 * @description save up things upon local storage
 */
export default function useLocalStorage(key: string, value: any): HooksLocalStorage;
export {};

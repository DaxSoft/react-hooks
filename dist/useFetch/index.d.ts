interface HooksFetchInit {
    endpoint: string;
    body?: object;
    config?: object;
    token?: string;
    onSuccess?: Function;
    onError?: Function;
    onData?: Function;
    start: Boolean;
    stateInit: any;
    query?: object | null;
    format?: Function | null;
    generalOptions?: object;
}
interface HooksFetch {
    data: any;
    loading: object;
    error: any;
    refresh: object;
    setup: object;
    setUri: Function;
    uri: string;
    method: string;
    setMethod: Function;
    success: object;
    queries: object;
    header: object;
}
/**
 * @description fetch API's Rest easily
 */
export default function useFetch({ endpoint, body, config, token, onSuccess, onError, onData, start, stateInit, query, format, generalOptions, }: HooksFetchInit, methodHTTP: string | undefined, fetch: any): HooksFetch;
export {};

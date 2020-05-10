interface HooksClient {
    inClient: Boolean;
    inServer: Boolean;
}
/**
 * @description Check out if he website is on 'server-side' or 'client-side'
 * @param {Function} onChange[Boolean]
 * @example
 * const { inClient, inServer } = useClient();
 * // or
 * useClient((inClient) => console.log(!!inClient ? "client-side" : "server-side"))
 */
export default function useClient(onChange?: Function): HooksClient;
export {};

import { useEffect, useMemo } from 'react'
import useBoolean from '../useBoolean'

/**
 * @type {function}
 * @description check if the dom element is available
 */

const hasDOM = (): Boolean =>
    typeof window !== 'undefined' &&
    !!window.document &&
    !!window.document.createElement

interface HooksClient {
    inClient: Boolean
    inServer: Boolean
}

/**
 * @description Check out if he website is on 'server-side' or 'client-side'
 * @param {Function} onChange[Boolean]
 * @example
 * const { inClient, inServer } = useClient();
 * // or
 * useClient((inClient) => console.log(!!inClient ? "client-side" : "server-side"))
 */

export default function useClient(onChange?: Function) {
    const inClient = useBoolean(hasDOM())

    useEffect(() => {
        inClient.set(hasDOM())
        if (!!onChange && typeof onChange === 'function')
            onChange(inClient.state)
        return () => inClient.off()
    }, [])

    const memoChecker = useMemo(
        () => ({
            inClient: inClient.isOn(),
            inServer: inClient.isOff(),
        }),
        [inClient.state]
    )

    return useMemo(
        (): HooksClient => ({
            inClient: memoChecker.inClient,
            inServer: memoChecker.inServer,
        }),
        [inClient.state]
    )
}

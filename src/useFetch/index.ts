import { useState, useEffect, useCallback } from 'react'
import useBoolean from '../useBoolean'
import useObject from '../useObject'

function objectToQuerystring(obj: object) {
    return (
        '?' +
        Object.keys(obj)
            .map((key) => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(
                    obj[key]
                )}`
            })
            .join('&')
    )
}

interface HooksFetchInit {
    endpoint: string
    body?: object
    config?: object
    token?: string
    onSuccess?: Function
    onError?: Function
    onData?: Function
    start: Boolean
    stateInit: any
    query?: object | null
    format?: Function | null
    generalOptions?: object
}

interface HeaderConfig {
    key: string
    value: any
}

interface HooksFetch {
    data: any
    loading: object
    error: any
    refresh: object
    setup: object
    setUri: Function
    uri: string
    method: string
    setMethod: Function
    success: object
    queries: object
    header: object
}

/**
 * @description fetch API's Rest easily
 */

export default function useFetch(
    {
        endpoint,
        body,
        config = {},
        token,
        onSuccess,
        onError,
        onData,
        start = true,
        stateInit = [],
        query,
        format = null,
        generalOptions = {},
    }: HooksFetchInit,
    methodHTTP = 'GET',
    fetch: any
): HooksFetch {
    const [data, setData] = useState(stateInit)
    const loading = useBoolean(start)
    const [error, setError] = useState(null)
    const refresh = useBoolean(start)
    const setup = useObject(body || {})
    const [uri, setUri] = useState(endpoint)
    const [method, setMethod] = useState(methodHTTP)
    const success = useBoolean(false)
    const queries = useObject(query || {})
    const header = useObject(
        config || {},
        !!token ? { 'x-user-token': token } : {}
    )
    const serializer = useCallback(
        (setup) =>
            typeof format === 'function'
                ? format(setup)
                : JSON.stringify(setup),
        []
    )

    useEffect(() => {
        if (refresh.isOn()) {
            loading.on()
            setError(null)
            refresh.off()
            success.off()

            const headers = new Headers()
            header.each((value: HeaderConfig) =>
                headers.append(value.key, value.value)
            )

            const options: any = {
                method,
                headers,
            }

            if (typeof generalOptions === 'object') {
                Object.assign(options, generalOptions)
            }

            if (setup.isValid()) {
                options.body = serializer(setup.state)
            }

            let queryUrl = queries.isValid()
                ? objectToQuerystring(queries.state)
                : ''

            fetch(`${uri}${queryUrl}`, {
                ...options,
            })
                .then(async (response: any) => {
                    const dataResponse =
                        typeof onData === 'function'
                            ? await onData(response)
                            : await response.json()
                    setData(dataResponse)
                    success.on()
                    if (typeof onSuccess === 'function') onSuccess(dataResponse)
                    loading.off()
                })
                .catch((err: any) => {
                    setError(err)
                    success.off()
                    if (typeof onError === 'function') onError(err)
                    loading.off()
                })
        }

        return () => setData([])
    }, [refresh.state])

    return {
        data,
        loading,
        error,
        refresh,
        setup,
        setUri,
        uri,
        method,
        setMethod,
        success,
        queries,
        header,
    }
}

import { useState, useEffect, useCallback } from 'react'
import useBoolean from './useBoolean'
import useObject from './useObject'

function objectToQuerystring(obj) {
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
        query = null,
        format = null,
        generalOptions = {},
    },
    methodHTTP = 'GET',
    fetch
) {
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
            header.each(({ key, value }) => headers.append(key, value))

            const options = {
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

            // if (queries.isValid()) {
            //     queries.each(({ value, key, index }) => {
            //         queryUrl += `${key}=${value}`
            //         if (index !== queries.length() - 1) queryUrl += '&'
            //     })
            // }

            fetch(`${uri}${queryUrl}`, {
                ...options,
            })
                .then(async (response) => {
                    const dataResponse =
                        typeof onData === 'function'
                            ? await onData(response)
                            : await response.json()
                    setData(dataResponse)
                    success.on()
                    if (typeof onSuccess === 'function') onSuccess(dataResponse)
                    loading.off()
                })
                .catch((err) => {
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

import { useState, useCallback, useEffect, useMemo } from 'react'
import useBoolean from './useBoolean'

/**
 * Hook to execute a async function while handling with states
 * @param {Function|Array<Function>} func async function, it can
 * be a array with async functions.
 * @param {Boolean} start execute at first
 */

export default function useAsync(func, { start = true, paramaters = [] }) {
    const pending = useBoolean(false)
    const [response, setResponse] = useState([])
    const [error, setError] = useState([])

    const handler = useCallback(() => {
        pending.isOn()
        const promises = Array.isArray(func) ? func : [func]

        return Promise.all(
            promises.map(async (element, n) => {
                const functArgs = !!paramaters[n] ? [...paramaters[n]] : [null]
                return await element(...functArgs)
            })
        )
            .then((value) => setResponse(value))
            .catch((value) => setError(value))
            .finally(pending.off)
    }, [func])

    useEffect(() => {
        if (start) {
            handler()
        }
    }, [handler, start])

    return useMemo(
        () => ({
            response,
            error,
            pending,
            handler,
        }),
        [func]
    )
}

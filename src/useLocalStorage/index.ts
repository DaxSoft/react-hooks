import { useState, useEffect, useMemo } from 'react'
import useClient from '../useClient'

interface HooksLocalStorage {
    get: Function
    set: Function
    state: any
}

/**
 * @description save up things upon local storage
 */

export default function useLocalStorage(key: string, value: any) {
    const { inServer } = useClient()

    if (inServer) return { get: () => null, set: () => false, state: null }

    const getItem = localStorage.getItem(key)

    const [state, setState] = useState(
        !!getItem ? JSON.parse(getItem) : JSON.stringify(value)
    )

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])

    return useMemo(
        (): HooksLocalStorage => ({
            get: () => JSON.parse(state),
            set: (value: any) => setState(JSON.stringify(value)),
            state,
        }),
        [state]
    )
}

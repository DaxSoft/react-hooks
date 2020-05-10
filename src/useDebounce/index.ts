import { useState, useEffect } from 'react'

/**
 * @description delays invoking a function until after wait milliseconds have elapsed since the last time
 */

export default function useDebounce(callback: Function, timeout: number) {
    const [state, setState] = useState(callback)

    useEffect(() => {
        const handler = setTimeout(() => setState(callback), timeout)

        return () => clearTimeout(handler)
    }, [callback, timeout])

    return state
}

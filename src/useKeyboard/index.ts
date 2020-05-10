import { useState, useEffect, useCallback } from 'react'
import useClient from '../useClient'

export default function useKeyboard(key: string, callback: Function) {
    const { inClient } = useClient()

    if (!inClient) return null

    const [pressed, setPressed] = useState(false)

    const isMatching = useCallback(
        (event) =>
            event && event.key && key.toLowerCase() === event.key.toLowerCase(),
        [key]
    )

    const onDown = useCallback(
        (event) => {
            if (isMatching(event)) {
                setPressed(true)
                if (typeof callback === 'function') {
                    callback()
                }
            }
        },
        [callback]
    )

    const onUp = useCallback(
        (event) => isMatching(event) && setPressed(false),
        [key]
    )

    useEffect(() => {
        window.addEventListener('keydown', onDown)
        window.addEventListener('keyup', onUp)

        return () => {
            window.removeEventListener('keydown', () => {})
            window.removeEventListener('keyup', () => {})
        }
    }, [key])

    return pressed
}

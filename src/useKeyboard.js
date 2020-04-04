import { useState, useEffect, useCallback } from 'react'

const isBrowser = typeof window !== `undefined`

export default function useKeyboard(key, callback) {
    if (!isBrowser) return false

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
            window.removeEventListener('keydown', null)
            window.removeEventListener('keyup', null)
        }
    }, [key])

    return pressed
}

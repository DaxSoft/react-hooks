import { useState, useMemo } from 'react'
/**
 * @description Complete hook to handle with Boolean value and
 * made it easy to manage the state
 * @param {Boolean} initialValue
 */
export default function useBoolean(initialValue = false) {
    const [state, setState] = useState(initialValue)

    return useMemo(
        () => ({
            state,
            set: setState,
            on: () => setState(true),
            off: () => setState(false),
            isOn: () => !!state === true,
            isOff: () => !!state === false,
            toggle: () => setState(!state),
            hex: () => +state,
        }),
        [state]
    )
}

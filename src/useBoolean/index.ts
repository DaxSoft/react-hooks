/* eslint-disable */

import { useState, useMemo } from 'react'

interface HooksBoolean {
    state: Boolean
    set: Function
    on: Function
    off: Function
    isOn: Function
    isOff: Function
    toggle: Function
    hex: Function
}

/**
 * @description This is a complete hook to handle with Boolean values.
 */

const useBoolean = (initialValue: Boolean) => {
    const [state, setState] = useState(initialValue)

    return useMemo(
        (): HooksBoolean => ({
            state,
            set: setState,
            on: () => setState(true),
            off: () => setState(false),
            isOn: () => state === true,
            isOff: () => state === false,
            toggle: () => setState(!state),
            hex: () => +state,
        }),
        [state]
    )
}

export default useBoolean

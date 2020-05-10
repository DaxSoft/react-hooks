/* eslint-disable */

import { useState, useMemo } from 'react'

interface HooksObject {
    state: any
    setState: Function
    set: Function
    handle: Function
    stateAssign: Function
    objectAssign: Function
    isValid: Function
    empty: Function
    has: Function
    typeof: Function
    keys: Function
    length: Function
    each: Function
    remove: Function
}

/**
 * @description A better way to handle with Objects
 * @param data object data
 * @param assign assign object data to 'data' paramater
 */

const useObject = (data: object, assign?: object) => {
    const [state, setState] = useState(
        typeof assign === 'object' ? Object.assign(data, assign) : data
    )
    return useMemo(
        (): HooksObject => ({
            state,
            setState,
            set: (key: string, value: any) => {
                const uValue = Object.assign({}, state)
                uValue[key] = value
                setState(uValue)
                return value
            },
            handle: (key: string, callback: Function) => {
                const uValue = Object.assign({}, state)
                uValue[key] = callback(uValue[key], state)
                setState(uValue)
            },
            stateAssign: (object: Object) =>
                setState(Object.assign(state, object)),
            objectAssign: (object: Object) =>
                setState(Object.assign(object, state)),
            isValid: () =>
                state !== null &&
                typeof state === 'object' &&
                Object.keys(state).length > 0,
            empty: () => setState({}),
            has: (key: string) => state.hasOwnProperty(key),
            typeof: (keyword: string, type: String) =>
                typeof state[keyword] === type,
            keys: () => Object.keys(state),
            length: () => Object.keys(state).length,
            each: (callback: Function) =>
                Object.keys(state).map((key, index, array) =>
                    callback({
                        key,
                        index,
                        array,
                        value: state[key],
                    })
                ),
            remove: (key: string) =>
                state.hasOwnProperty(key) && delete state[key],
        }),
        [state]
    )
}

export default useObject

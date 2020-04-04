import { useMemo } from 'react'
import useBoolean from './useBoolean'

/**
 * @description create a toggle object handler
 * @param {Object} toggles Set a list of objects with 'Boolean' values,
 * in which will be set towards the 'useBoolean'.
 * @example
 * const listToggle = useToggle({ a: false, b: true });
 *
 * // check the value using the methods from 'useBoolean'
 * listToggle.state.a.isOn() && <h1>A toggle is ON</h1>
 *
 * // or you can access by using '$'
 * listToggle.$a.on() // turns toggle into true
 *
 * // highlight the value of a element to true while set all others
 * // to false
 * listToggle.highlight('a')
 *
 * // shadow the value of a element to false while set all
 * // others to true
 * listToggle.shadow('a')
 *
 * // reset all values to 'x' boolean value
 * listToggle.reset(false)
 */

export default function useToggle(data) {
    const state = {}
    const dollarSign = {}

    Object.keys(data).map((dataKey) => {
        state[dataKey] = useBoolean(!!data[dataKey])
        dollarSign[`$${dataKey}`] = state[dataKey]
    })

    return useMemo(
        () => ({
            state,
            toggle: (key) => state.hasOwnProperty(key) && state[key].toggle(),
            set: (key, value) => {
                if (state.hasOwnProperty(key)) {
                    state[key].set(value)
                } else {
                    state[key] = useBoolean(value)
                }
            },
            check: (key) => !!state[key].state,
            highlight: (key) => {
                for (const option in state) {
                    state[option].set(key === option)
                }
            },
            shadow: (key) => {
                for (const option in state) {
                    state[option].set(key !== option)
                }
            },
            reset: (value = false) => {
                for (const option in state) {
                    state[option].set(value)
                }
            },
            enabled: () =>
                Object.keys(state).filter((key) => state[key].isOn()),
            disabled: () =>
                Object.keys(state).filter((key) => state[key].isOff()),
            keys: () => Object.keys(state),
            each: (callback) =>
                Object.keys(state).map((key, index) =>
                    callback({ key, index, value: state[key] })
                ),
            isAll: (value = true, except = null) => {
                let checker = true
                for (const option in state) {
                    const stateValue = state[option].state
                    const hasException = Array.isArray(except)
                        ? except.indexOf(option) !== -1
                        : false

                    //console.log(option, stateValue, 'except', hasException);

                    if (!hasException && stateValue !== value) {
                        checker = false
                        break
                    }
                }
                return checker
            },
            ...dollarSign,
        }),
        [state]
    )
}

import { useMemo, useCallback } from 'react'
import useObject from './useObject'

/**
 * @function useIndex
 * @description Useful for 'index' menu such as page1, page2 and so on
 * @param {Number} setup.at // start at?
 * @param {Number} setup.min
 * @param {Number} setup.max
 * @param {Boolean} setup.reverse // it it reaches the min or max, go to the
 * extreme point
 * @param {Number} setup.step // advances
 * @param {Function} setup.format // formats the step
 * @example
 * const indexor = useIndex({
 *  at: 0,
 *  min: 0,
 *  max: 9,
 *  step: .5,
 *  format: (step) => ~~step
 * })
 */

export default function useIndex({
    value = 0,
    min = 0,
    max = 9,
    reverse = true,
    step = 1,
    format = null,
}) {
    const setup = useObject({
        value,
        min,
        max,
        reverse,
        step,
        format,
    })

    const handleFormat = useCallback(
        (value) =>
            typeof setup.state.format === 'function'
                ? setup.state.format(value)
                : value,
        [setup.state.format]
    )

    return useMemo(
        () => ({
            // index
            setup,
            state: setup.state.value,
            next: () =>
                setup.set(
                    'value',
                    handleFormat(setup.state.value) >= setup.state.max
                        ? setup.state.reverse
                            ? setup.state.min
                            : setup.state.max
                        : setup.state.value + setup.state.step
                ),
            pred: () =>
                setup.set(
                    'value',
                    handleFormat(setup.state.value) <= setup.state.min
                        ? setup.state.reverse
                            ? setup.state.max
                            : setup.state.min
                        : setup.state.value - setup.state.step
                ),
            set: (state) => setup.set('value', state),
            is: (index) => handleFormat(setup.state.value) === index,
            not: (index) => handleFormat(setup.state.value) !== index,
            between: (a, b) => {
                const value = handleFormat(setup.state.value)
                return value >= a && value <= b
            },
            among: (values) =>
                Array.isArray(values) &&
                values.indexOf(handleFormat(setup.state.value)) !== -1,
            start: () => setup.set('value', setup.state.min),
            end: () => setup.set('value', setup.state.max),
            list: (value) => new Array(value || setup.state.max).fill(1),

            // paginate
        }),
        [setup.state]
    )
}

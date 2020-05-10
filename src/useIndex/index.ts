import { useMemo, useCallback } from 'react'
import useObject from '../useObject'

interface HooksIndex {
    setup: any
    current: number
    next: Function
    pred: Function
    set: Function
    is: Function
    not: Function
    between: Function
    among: Function
    start: Function
    end: Function
    list: Function
}

/**
 * @function useIndex
 * @description Useful for 'index' function such as page1, page2 and so on
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
        (): HooksIndex => ({
            // index
            setup,
            current: setup.state.value,
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
            set: (state: any) => setup.set('value', state),
            is: (index: number) => handleFormat(setup.state.value) === index,
            not: (index: number) => handleFormat(setup.state.value) !== index,
            between: (a: number, b: number) => {
                const value = handleFormat(setup.state.value)
                return value >= a && value <= b
            },
            among: (values: Array<Number>) =>
                Array.isArray(values) &&
                values.indexOf(handleFormat(setup.state.value)) !== -1,
            start: () => setup.set('value', setup.state.min),
            end: () => setup.set('value', setup.state.max),
            list: (value: Number) =>
                new Array(value || setup.state.max).fill(1),

            // paginate
        }),
        [setup.state]
    )
}

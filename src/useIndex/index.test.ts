import { renderHook, act } from '@testing-library/react-hooks'
import useIndex from '.'

jest.useFakeTimers()

describe('useIndex', () => {
    const { result } = renderHook(() =>
        useIndex({
            value: 0,
            min: 0,
            max: 3,
            step: 1,
            reverse: true,
            format: null,
        })
    )

    const currentValue = result.current.current

    test('current', () => expect(currentValue).toBe(0))

    act(() => result.current.next() && undefined)
    test('next', () => {
        expect(result.current.is(1)).toBe(true)
    })

    test('not', () => {
        expect(result.current.not(0)).toBe(true)
    })

    test('between', () => expect(result.current.between(0, 3)).toBe(true))

    test('among', () =>
        expect(result.current.among([0, 2, 3, 5, 9])).toBe(false))
})

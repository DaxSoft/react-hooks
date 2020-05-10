import { renderHook, act } from '@testing-library/react-hooks'
import useToggle from '.'

jest.useFakeTimers()

describe('useToggle', () => {
    const { result } = renderHook(() =>
        useToggle({
            x: true,
            y: false,
        })
    )

    act(() => result.current.toggle('x'))
    test('toggle', () => expect(result.current.check('x')).toBe(false))

    test('y state', () => expect(result.current.$y.isOff()).toBe(true))

    test('isAll', () => expect(result.current.isAll(true)).toBe(false))
})

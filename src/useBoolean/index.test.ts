import { renderHook, act } from '@testing-library/react-hooks'
import useBoolean from '.'

jest.useFakeTimers()

describe('useBoolean', () => {
    const { result } = renderHook(() => useBoolean(false))

    expect(typeof result.current === 'object').toBe(true)
    expect(typeof result.current.state === 'boolean').toBe(true)

    act(() => result.current.on())
    test('check if the state is true', () => {
        expect(result.current.isOn()).toBe(true)
    })

    act(() => result.current.off())
    test('check if the state is false', () => {
        expect(result.current.isOff()).toBe(false)
    })

    act(() => result.current.toggle())
    test('reverse the state, from false to true', () => {
        expect(result.current.state).toBe(true)
    })

    test('get the hex number of the state', () => {
        expect(result.current.hex()).toBe(1)
    })
})

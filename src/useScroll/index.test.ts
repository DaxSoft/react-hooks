import { renderHook } from '@testing-library/react-hooks'
import useScroll from '.'

jest.useFakeTimers()

describe('useScroll', () => {
    const { result } = renderHook(() => useScroll())

    const { y } = result.current

    test('y', () => expect(y).toBe(0))
})

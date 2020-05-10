import { renderHook, act } from '@testing-library/react-hooks'
import useScreenSize from '.'

jest.useFakeTimers()

describe('useScreenSize', () => {
    const { result } = renderHook(() => useScreenSize({}))

    const { innerWidth, orientation } = result.current

    test('innerWidth', () => expect(typeof innerWidth === 'number').toBe(true))

    test('orientation', () => expect(orientation).toBe('landscape'))
})

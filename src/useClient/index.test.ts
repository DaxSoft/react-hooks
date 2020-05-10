import { renderHook } from '@testing-library/react-hooks'
import useClient from '.'

jest.useFakeTimers()

describe('useClient', () => {
    const { result } = renderHook(() => useClient())

    test('inClient', () => {
        expect(result.current.inClient).toBe(true)
    })

    test('inServer', () => {
        expect(result.current.inServer).toBe(false)
    })
})

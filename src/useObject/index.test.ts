import { renderHook, act } from '@testing-library/react-hooks'
import useObject from '.'

jest.useFakeTimers()

describe('useObject', () => {
    const getTodayDate: Number = new Date().getDate()

    const { result } = renderHook(() =>
        useObject({ x: 0, surname: 'Willian' }, { name: 'Michael' })
    )

    test('state', () => {
        expect(
            !!result.current.state.x &&
                !result.current.state.surname &&
                !!result.current.state.name
        ).toBe(true)
    })

    act(() => result.current.set('x', 1) && undefined)

    test('set', () => expect(result.current.state.x).toBe(1))

    act(() => {
        result.current.handle('name', function name(
            currentState: any,
            generalState: any
        ) {
            return currentState.replace(/(i)/im, generalState.x)
        }) && undefined
    })

    test('handle', () => expect(result.current.state.name).toBe('M1chael'))

    act(
        () =>
            result.current.stateAssign({ birthday: '02/13/1998' }) && undefined
    )

    test('stateAssign', () =>
        expect(result.current.state.birthday).toBe('02/13/1998'))

    act(() => result.current.objectAssign({ today: getTodayDate }) && undefined)

    test('objectAssign', () =>
        expect(result.current.state.today).toBe(getTodayDate))

    act(() => result.current.remove('surname') && undefined)

    test('has', () => expect(result.current.has('name')).toBe(true))

    test('typeof', () =>
        expect(result.current.typeof('today', 'number')).toBe(true))

    act(() => {
        result.current.each(function (state: any) {
            result.current.set('id', state.value.toString(16))
        }) && undefined
    })

    test('length', () => expect(result.current.length()).toBe(5))

    test('isValid', () => expect(result.current.isValid()).toBe(true))
})

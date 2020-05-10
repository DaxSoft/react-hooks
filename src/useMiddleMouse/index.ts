import { useState, useEffect, useCallback, useMemo } from 'react'
import useClient from '../useClient'

interface HooksMiddleMouse {
    direction: number
    setDirection: Function
}

/**
 * @function useMiddleMouse
 * @description check if the wheel of the mouse goes down or up
 * @example
 * const middleMouse = useMiddleMouse(20)
 * useEffect(() => {
 *       if (middleMouse.direction === 1) setIndex((index + 1) % 3);
 *       if (middleMouse.direction === -1) setIndex( index <= 0 ? 3 : index - 1 );
 *       return () => middleMouse.setDirection(0)
 *   }, [middleMouse.direction])
 */

export default function useMiddleMouse(threshould: number) {
    const { inServer } = useClient()
    if (!!inServer) return

    const target = window

    const [direction, setDirection] = useState(0)

    const handleDirection = useCallback(
        ({ event, threshould, setDirection }) => {
            if (event.deltaY < -threshould) {
                setDirection(-1)
            } else if (event.deltaY > threshould) {
                setDirection(1)
            }
        },
        []
    )

    useEffect(() => {
        target.addEventListener('wheel', (event) =>
            handleDirection({
                event,
                setDirection,
                threshould,
            })
        )

        return () => {
            target.removeEventListener('wheel', (event) =>
                handleDirection({
                    event,
                    setDirection,
                    threshould,
                })
            )
        }
    }, [])

    return useMemo(
        (): HooksMiddleMouse => ({
            direction,
            setDirection,
        }),
        [direction]
    )
}

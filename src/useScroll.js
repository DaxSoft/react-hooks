import { useEffect, useCallback } from 'react'
import useObject from './useObject'
import useClient from './useClient'

/**
 * @description provides a way to check the state of the
 * document scroll paramaters.
 * @returns {Object<useObject>}
 * @emits scroll<useObject>
 * @emits scroll.state.x
 * @emits scroll.state.y
 * @emits scroll.state.isRight
 * @emits scroll.state.isLeft
 * @emits scroll.state.isTop
 * @emits scroll.state.isBottom
 * @example
 * const scroll = useScroll();
 * { scroll.isRight && <ScrollToRight /> }
 */

export default function useScroll() {
    const { inClient } = useClient()

    const scroll = useObject({
        x: 0,
        y: 0,
        isRight: false,
        isLeft: true,
        isTop: false,
        isBottom: true,
        bottom: 0,
        right: 0,
        offsetX: 0,
        offsetY: 0,
    })

    const listener = useCallback((event) => {
        const {
            left,
            top,
            bottom,
            right,
        } = document.body.getBoundingClientRect()

        scroll.setState({
            x: left,
            y: top,
            isRight: scroll.state.x > left,
            isLeft: scroll.state.x > -left,
            isBottom: scroll.state.y > top,
            isTop: scroll.state.y > -bottom,
            bottom,
            right,
            offsetY: scroll.state.y - top,
            offsetX: scroll.state.x - left,
        })
    }, [])

    useEffect(() => {
        if (!!inClient) {
            window.addEventListener('scroll', listener)
            return () => window.removeEventListener('scroll', listener)
        }
    }, [])

    const toTop = useCallback(() => {
        if (!!inClient) {
            window.scrollTo(0, 0)
        }
    }, [])

    return { ...scroll.state, toTop }
}

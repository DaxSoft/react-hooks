import { useEffect, useCallback, useMemo } from 'react'
import useObject from '../useObject'
import useClient from '../useClient'

interface HooksScroll {
    toTop: Function
    x: Number
    y: Number
    isRight: Boolean
    isLeft: Boolean
    isTop: Boolean
    isBottom: Boolean
    bottom: Number
    right: Number
    offsetX: Number
    offsetY: Number
}

/**
 * @description provides a way to check the state of the
 * document scroll paramaters.
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

    const listener = useCallback(() => {
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

    useEffect((): any => {
        if (!!inClient) {
            window.addEventListener('scroll', listener)
            return () => window.removeEventListener('scroll', listener)
        }
    }, [])

    const toTop = useCallback((): any => {
        if (!!inClient) {
            window.scrollTo(0, 0)
        }
    }, [])

    return useMemo(
        (): HooksScroll => ({
            toTop,
            x: scroll.state.x,
            y: scroll.state.y,
            isRight: scroll.state.isRight,
            isLeft: scroll.state.isLeft,
            isTop: scroll.state.isTop,
            isBottom: scroll.state.isBottom,
            bottom: scroll.state.bottom,
            right: scroll.state.right,
            offsetX: scroll.state.offsetX,
            offsetY: scroll.state.offsetY,
        }),
        [scroll]
    )
}

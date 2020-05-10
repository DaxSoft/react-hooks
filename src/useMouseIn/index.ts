import { useEffect, useCallback } from 'react'
import useClient from '../useClient'

/**
 * @function useMouseIn
 * @description Check if the user clicked inside of a element with the Mouse.
 * @param {React.useRef} ref
 * @param {Function} callback
 * @returns {useBoolean};
 * @example
 * const clickRef = React.useRef();
 * useMouseIn(clickRef, callback);
 *
 * <div ref={clickRef} />
 */

export default function useMouseIn(ref: any, callback: Function): void {
    const { inServer } = useClient()
    if (inServer) return

    const handleClick = useCallback(
        (event) => callback(ref.current && ref.current.contains(event.target)),
        [ref]
    )

    useEffect(() => {
        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    })
}

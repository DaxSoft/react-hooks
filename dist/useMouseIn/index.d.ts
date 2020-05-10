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
export default function useMouseIn(ref: any, callback: Function): void;

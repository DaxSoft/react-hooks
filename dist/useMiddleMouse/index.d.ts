interface HooksMiddleMouse {
    direction: number;
    setDirection: Function;
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
export default function useMiddleMouse(threshould: number): HooksMiddleMouse | undefined;
export {};

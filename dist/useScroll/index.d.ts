interface HooksScroll {
    toTop: Function;
    x: Number;
    y: Number;
    isRight: Boolean;
    isLeft: Boolean;
    isTop: Boolean;
    isBottom: Boolean;
    bottom: Number;
    right: Number;
    offsetX: Number;
    offsetY: Number;
}
/**
 * @description provides a way to check the state of the
 * document scroll paramaters.
 * @example
 * const scroll = useScroll();
 * { scroll.isRight && <ScrollToRight /> }
 */
export default function useScroll(): HooksScroll;
export {};

interface HooksIndex {
    setup: any;
    current: number;
    next: Function;
    pred: Function;
    set: Function;
    is: Function;
    not: Function;
    between: Function;
    among: Function;
    start: Function;
    end: Function;
    list: Function;
}
/**
 * @function useIndex
 * @description Useful for 'index' function such as page1, page2 and so on
 * @example
 * const indexor = useIndex({
 *  at: 0,
 *  min: 0,
 *  max: 9,
 *  step: .5,
 *  format: (step) => ~~step
 * })
 */
export default function useIndex({ value, min, max, reverse, step, format, }: {
    value?: number | undefined;
    min?: number | undefined;
    max?: number | undefined;
    reverse?: boolean | undefined;
    step?: number | undefined;
    format?: null | undefined;
}): HooksIndex;
export {};

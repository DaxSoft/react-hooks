interface HooksToggle {
    state: any;
    toggle: Function;
    set: Function;
    check: Function;
    highlight: Function;
    shadow: Function;
    reset: Function;
    enabled: Function;
    disabled: Function;
    keys: Function;
    each: Function;
    isAll: Function;
}
/**
 * @description create a toggle object handler
 * @param {Object} toggles Set a list of objects with 'Boolean' values,
 * in which will be set towards the 'useBoolean'.
 * @example
 * const listToggle = useToggle({ a: false, b: true });
 *
 * // check the value using the methods from 'useBoolean'
 * listToggle.state.a.isOn() && <h1>A toggle is ON</h1>
 *
 * // or you can access by using '$'
 * listToggle.$a.on() // turns toggle into true
 *
 * // highlight the value of a element to true while set all others
 * // to false
 * listToggle.highlight('a')
 *
 * // shadow the value of a element to false while set all
 * // others to true
 * listToggle.shadow('a')
 *
 * // reset all values to 'x' boolean value
 * listToggle.reset(false)
 */
export default function useToggle(data: object): HooksToggle;
export {};

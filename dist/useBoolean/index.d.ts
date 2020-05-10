interface HooksBoolean {
    state: Boolean;
    set: Function;
    on: Function;
    off: Function;
    isOn: Function;
    isOff: Function;
    toggle: Function;
    hex: Function;
}
/**
 * @description This is a complete hook to handle with Boolean values.
 */
declare const useBoolean: (initialValue: Boolean) => HooksBoolean;
export default useBoolean;

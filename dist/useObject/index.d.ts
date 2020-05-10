interface HooksObject {
    state: any;
    setState: Function;
    set: Function;
    handle: Function;
    stateAssign: Function;
    objectAssign: Function;
    isValid: Function;
    empty: Function;
    has: Function;
    typeof: Function;
    keys: Function;
    length: Function;
    each: Function;
    remove: Function;
}
/**
 * @description A better way to handle with Objects
 * @param data object data
 * @param assign assign object data to 'data' paramater
 */
declare const useObject: (data: object, assign?: object | undefined) => HooksObject;
export default useObject;

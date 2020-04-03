import { useState, useMemo } from "react";

/**
 * @function useObject
 * @description A better way to handle with Objects
 * @param {Object} data
 * @param {Object} assign If it is a valid object it will 'assign' to the 'data',
 * using Object.assign(data, assign)
 * @returns {Object}
 */

export default function useObject(data, assign) {
   const [state, setState] = useState(
      typeof assign === "object" ? Object.assign(data, assign) : data
   );

   return useMemo(
      () => ({
         state,
         set: (key, value) => {
            const uValue = Object.assign({}, state);
            uValue[key] = value;
            setState(uValue);
            return value;
         },
         handle: (key, callback) => {
            const uValue = Object.assign({}, state);
            uValue[key] = callback(uValue[key], state);
            setState(uValue);
         },
         stateAssign: (object) => setState(Object.assign(state, object)),
         objectAssign: (object) => setState(Object.assign(object, state)),
         isValid: () =>
            typeof state === "object" && Object.keys(state).length > 0,
         empty: () => setState({}),
         setState: (newState) => setState(newState),
         has: (key) => state.hasOwnProperty(key),
         is: (keyword, type) => typeof state[keyword] === type,
         instance: (keyword, instanceChecker) =>
            state[keyword] instanceof instanceChecker,
         keywords: () => Object.keys(state),
         length: () => Object.keys(state).length,
         each: (callback) =>
            Object.keys(state).map((key, index, array) =>
               callback({
                  key,
                  index,
                  array,
                  value: state[key],
               })
            ),
      }),
      [state]
   );
}

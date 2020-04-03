import { useEffect, useCallback } from "react";
import useClient from "./useClient";

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

export function useMouseIn(ref, callback) {
   const { inServer } = useClient();

   if (inServer) return false;

   const handleClick = useCallback(
      (event) =>
         ref.current && ref.current.contains(event.target) && callback(),
      [ref]
   );

   useEffect(() => {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
   });

   return true;
}

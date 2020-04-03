import { useState, useEffect, useMemo } from "react";

export default function useLocalStorage(key, value = {}) {
   const [state, setState] = useState(
      !!localStorage.getItem(key)
         ? JSON.parse(localStorage.getItem(key))
         : JSON.stringify(value)
   );

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
   }, [state]);

   return useMemo(
      () => ({
         get: () => JSON.parse(state),
         set: (value) => setState(JSON.stringify(value)),
         state,
      }),
      [state]
   );
}

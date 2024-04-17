import { useEffect, useRef } from "react";

/**
 * Saves a value into a ref object and then update it on renders
 *
 * **NOTE:** If the consuming component is rerendered as a result of another piece of state's change then the "previous" value will catch up to the current value, so beware of that
 * @see https://blog.logrocket.com/accessing-previous-props-state-react-hooks/
 * @param value The value you want to save
 * @returns The previous value
 */
function usePreviousRenderedValue<T = unknown>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}
export default usePreviousRenderedValue;

import React from "react";

/**
 * Represents a shared property with a value and a setter function.
 * @template T - The type of the value.
 */
export interface sharedProperty<T> {
  value: T,
  setter: React.Dispatch<React.SetStateAction<T>>
}

/**
 * Custom hook that creates a shared state with a value and a setter function.
 *
 * @template T - The type of the state value.
 * @param {T} initialValue - The initial value of the state.
 * @returns {sharedProperty<T>} An object containing the state value and the setter function.
 */
export function useSharedState<T>(initialValue: T): sharedProperty<T> {
  const [v, s] = React.useState(initialValue);

  return {
    value: v,
    setter: s
  };
};

export default sharedProperty;

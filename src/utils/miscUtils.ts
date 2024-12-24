import { v4 as uuidv4 } from "uuid";

/**
 * Filters out properties from an object based on a given filter list.
 *
 * @param propsObject - The object containing the properties to filter.
 * @param filterList - An array of property names to be filtered out.
 * @returns A new object with the filtered properties.
 */
export function propsFilter(propsObject: any, filterList: string[]) {
  const propsArray = Object.entries(propsObject);
  const filteredPropsArray = propsArray.filter(([key, value]) => {
    // Removes all the keys that are in the filterList
    return !filterList.includes(key);
  });
  const newProps = Object.fromEntries(filteredPropsArray);
  return newProps;
}

/**
 * Generates a UUID (Universally Unique Identifier).
 * @returns A string representing the generated UUID.
 */
export function getUuid(): string {
  const uuid = uuidv4();
  return uuid;
}

/**
 * Updates a specific property of the current state object and returns the updated state.
 *
 * @template T - The type of the state object.
 * @template K - The type of the property key to update.
 * @param {K} propertyKey - The key of the property to update.
 * @param {T[K]} newValue - The new value to set for the property.
 * @param {T} currentState - The current state object.
 * @param {React.Dispatch<React.SetStateAction<T | undefined | null>>} stateSetter - The state setter function.
 * @returns {T} - The updated state object.
 */
export function formFieldStateSetter<T, K extends keyof T>(
  propertyKey: K,
  newValue: T[K],
  currentState: T,
  stateSetter: React.Dispatch<React.SetStateAction<T | undefined | null>>,
): T {
  const newState = { ...currentState };
  newState[propertyKey] = newValue;
  stateSetter(newState);
  return newState;
}


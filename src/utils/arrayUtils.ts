/**
 * Removes an item from an array based on a specified property and value.
 * @param source - The source array.
 * @param prop - The property to match against.
 * @param value - The value to match against the specified property.
 * @returns The removed item from the array, or null if no matching item is found.
 */
export function removeItemFromArray(source: Array<any>, prop: string, value: any): any {
  const index = source.findIndex(x => x[prop] === value);
  if (index < 0) return null;
  return source.splice(index, 1);
}

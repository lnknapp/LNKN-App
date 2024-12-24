/**
 * Parses the given route and path to extract route parameters.
 * 
 * @param route - The route pattern containing parameter placeholders.
 * @param path - The actual path to match against the route pattern.
 * @returns A Map object containing the extracted route parameters.
 */
export function getRouteParams(route: string, path: string): Map<string, string> {
  const routeParts = route.split("/");
  const pathParts = path.split("/");
  const params = new Map<string, string>();
  for (let index = 0; index < routeParts.length; index++) {
    const routePart = routeParts[index];
    const pathPart = pathParts[index];
    if (routePart.startsWith(":")) {
      const key = routePart.substring(1);
      params.set(key, pathPart);
    }
  }
  return params;
}

/**
 * Parses a query string and returns a map of query parameter key-value pairs.
 * @param query - The query string to parse.
 * @returns A map containing the query parameter key-value pairs.
 */
export function getQueryValues(query: string): Map<string, string> {
  const params = new Map<string, string>();
  query = query.replace("?", "");
  const queryParts = query.split("&");
  queryParts.forEach((part) => {
    const keyValue = part.split("=");
    params.set(keyValue[0], keyValue[1]);
  });
  return params;
}

/**
 * Retrieves the value of a query parameter from a given query string.
 * @param query - The query string.
 * @param key - The key of the query parameter.
 * @returns The value of the query parameter, or null if not found.
 */
export function getQueryValue(query: string, key: string): string | null {
  const params = getQueryValues(query);
  const value =
    params.get(key) ??
    params.get(key.toLowerCase()) ??
    params.get(key.toUpperCase());
  return value ?? null;
}

/**
 * CustomURLSearchParams extends the built-in URLSearchParams class
 * and provides a custom implementation of the `get` method.
 */
export class CustomURLSearchParams extends URLSearchParams {
  /**
   * Gets the value of the first query parameter with the specified name.
   * The method is case-insensitive.
   * @param name - The name of the query parameter.
   * @returns The value of the query parameter, or null if not found.
   */
  get(name: string): string | null {
    const value =
      super.get(name) ??
      super.get(name.toLowerCase()) ??
      super.get(name.toUpperCase());
    return value;
  }
}

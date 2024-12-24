import { Params } from "react-router-dom";

/**
 * A utility class for working with URL parameters and paths.
 */
export class UrlService {
  /**
   * Retrieves the value(s) of the specified query parameter(s) from the current URL.
   * @param param - The name(s) of the query parameter(s) to retrieve.
   * @returns The value(s) of the query parameter(s) as a string or an array of strings, or null if the parameter(s) is not found.
   */
  static getQueryParams<T extends string | string[]>(param: T): T | null {
    const searchParams = new URLSearchParams(window.location.search);

    if (Array.isArray(param)) {
      let paramValues: string[] = [];
      param.forEach((p) => {
        const paramValue = searchParams.get(p);
        if (paramValue) paramValues.push(paramValue);
      });
      return paramValues as T;
    } else {
      const paramValue = searchParams.get(param);
      return paramValue as T;
    }
  }

  /**
   * Retrieves the value of the specified URL parameter from the given URL parameters object.
   * @param paramName - The name of the URL parameter to retrieve.
   * @param urlParams - The URL parameters object.
   * @returns The value of the URL parameter as a string, or undefined if the parameter is not found.
   */
  static getParamValue(paramName: string, urlParams: Readonly<Params<string>>): string | undefined {
    const caseInsensitiveParamName = Object.keys(urlParams).find(
      (key) => key.toLowerCase() === paramName.toLowerCase()
    );
    return caseInsensitiveParamName ? urlParams[caseInsensitiveParamName] : undefined;
  }

  /**
   * Checks if the current URL matches the specified search string or strings.
   * @param searchString - The search string or an array of search strings to match against the current URL.
   * @param activeMatchExact - Optional. Specifies whether the match should be exact (including the entire URL path) or not. Defaults to true.
   * @returns True if the current URL matches the search string(s), false otherwise.
   */
  static isUrlActive(searchString: string | string[], activeMatchExact?: boolean): boolean {
    let match = false;
    let url = window.location.pathname.toLowerCase();
    if (url.endsWith("/")) url = url.slice(0, -1);

    if (Array.isArray(searchString)) {
      match = searchString
        .map((s) => s.toLowerCase())
        .some((r) => {
          const pattern = new RegExp("^" + r.replace(":id", "(\\d+)")
            + ((activeMatchExact || activeMatchExact === undefined) ? "$" : ""));
          return pattern.test(url);
        });
    } else {
      const pattern = new RegExp("^" + searchString.toLocaleLowerCase().replace(":id", "(\\d+)")
        + ((activeMatchExact || activeMatchExact === undefined) ? "$" : ""));
      match = pattern.test(url);
    }
    return match;
  }
}

export default UrlService;

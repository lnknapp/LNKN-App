import { UrlService } from "../services";

export function useQueryParams() {
  const getQueryParam = (param: string) => {
    return UrlService.getQueryParams(param);
  };

  return { getQueryParam };
}

import { useParams } from "react-router-dom";
import { UrlService } from "../services";

export function useUrlParams(param: string) {
  const urlParams = useParams();
  const value = UrlService.getParamValue(param, urlParams) ?? "";
  return value;
}

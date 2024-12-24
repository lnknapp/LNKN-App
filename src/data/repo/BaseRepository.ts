import HttpClient, { ResponseData } from "../../api/HttpClient";
import { store } from "../../app/store/store";
import { setInformation, setWarning, setError, setSuccess } from "../../app/store/exceptionSlice";
import { AlertLevel, AlertType } from "../../models";
import { forceLogout, toCamelCase } from "../../utils";

export class RepositoryError extends Error {
  code: number | undefined;
  constructor(message: string | undefined, code: number | undefined = undefined) {
    super(message ?? '');
    this.code = code;
  }
}

export abstract class BaseRepository {
  protected client = new HttpClient();

  protected handleResponse<T>(response: ResponseData<T>, showAlert: boolean = true, throwOnError: boolean = true) {
    if (response.success) {
      const parsed = this.parseJsonWithCaseInsensitiveKeys<T>(response.data);
      return parsed;
    }

    return this.handleException(response, showAlert, throwOnError);
  }

  private parseJsonWithCaseInsensitiveKeys<T>(data: any): T | null {
    if (data === undefined) return null;
    const jsonString = JSON.stringify(data);
    const transformedJsonString = jsonString.replace(/"([^"]+)":/g, (match, p1) => `"${toCamelCase(p1)}":`);
    const parsed = JSON.parse(transformedJsonString) as T;
    return parsed;
  }

  protected handleException<T>(response: ResponseData<T>, showAlert: boolean = true, throwOnError: boolean = true) {
    if (showAlert) {
      let action;

      switch (response.alertLevel!) {
        case AlertLevel.information:
          action = setInformation(response.exceptionMessage);
          break;
        case AlertLevel.warning:
          action = setWarning(response.exceptionMessage);
          break;
        case AlertLevel.error:
          action = setError(response.exceptionMessage);
          break;
        case AlertLevel.success:
          action = setSuccess(response.exceptionMessage);
          break;
      }
      store.dispatch(action);
    }

    if (response.alertType === AlertType.userAccess) {
      forceLogout();
    }

    if (throwOnError && !response.success) {
      throw new RepositoryError(response.exceptionMessage, response.status);
    }

    return null;
  }
}

export default BaseRepository;

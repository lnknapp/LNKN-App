import axios, { AxiosError, AxiosInstance } from 'axios';
import { store } from '../app';
import { AlertLevel, AlertType } from '../models';
import { Interface } from 'readline';

export interface ResponseData<T> {
  success: boolean;
  data?: T;
  status?: number;
  statusText?: string;
  headers?: any;
  config?: any;
  request?: any;
  exceptionMessage?: string;
  alertLevel?: AlertLevel;
  alertType: AlertType;
}

export default class HttpClient {
  private http: AxiosInstance;

  constructor() {
    const baseURL = process.env.REACT_APP_API_URL;
    const token = store.getState().authentication.userToken;
    const headers = token ? {
      Authorization: `Bearer ${token}`,
      'Content-Type': "application/json",
    } : undefined;

    this.http = axios.create({
      baseURL,
      headers: headers,
      maxRedirects: 0,
    });
    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && [301, 302, 307].includes(error.response.status)) {
          const redirectUrl = error.response.headers.location;
          return this.http.get(redirectUrl);
        }
        return Promise.reject(error);
      }
    );
  }

  get baseUrl(): string { return this.http.defaults.baseURL!; }

  get siteUrl(): string { return process.env.REACT_APP_SITE_URL!; }

  async get<T = any>(url: string, config?: any): Promise<ResponseData<T>> {
    try {
      const response = await this.http.get<T>(url, config);
      return this.handleResponse<T>(response);

    } catch (e) {
      const error = e as AxiosError;
      return this.handleError(error);
    }
  }

  async post<T = any>(url: string, body?: any, config?: any): Promise<ResponseData<T>> {
    try {
      const response = await this.http.post<T>(url, body, config);
      return this.handleResponse<T>(response);

    } catch (e) {
      const error = e as AxiosError;
      return this.handleError(error);
    }
  }

  async put<T = any>(url: string, body?: any, config?: any): Promise<ResponseData<T>> {
    try {
      const response = await this.http.put<T>(url, body, config);
      return this.handleResponse<T>(response);

    } catch (e) {
      const error = e as AxiosError;
      return this.handleError(error);
    }
  }

  async patch<T = any>(url: string, body?: any, config?: any): Promise<ResponseData<T>> {
    try {
      const response = await this.http.patch<T>(url, body, config);
      return this.handleResponse<T>(response);

    } catch (e) {
      const error = e as AxiosError;
      return this.handleError(error);
    }
  }

  async delete<T = any>(url: string, config?: any): Promise<ResponseData<T>> {
    try {
      const response = await this.http.delete<T>(url, config);
      return this.handleResponse<T>(response);

    } catch (e) {
      const error = e as AxiosError;
      return this.handleError(error);
    }
  }

  private handleResponse<T = Interface>(response: any): ResponseData<T> {

    const contentType = response.headers['content-type'] as string;

    const blobTypes = ['image', 'jpeg', 'jpg', 'png', 'gif', 'csv', 'pdf', 'octet-stream', 'sheet'];
    const typeWords = contentType?.split(';').flatMap((word) => word.split('/')) ?? [];
    const isBlob = typeWords?.some((word) => blobTypes.some((type) => word.includes(type))) ?? false;
    if (isBlob) {
      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
        request: response.request,
        exceptionMessage: "",
        data: response.data,
      } as ResponseData<T>;
    } else {
      const dataString = JSON.stringify(response.data);
      const parsedData = JSON.parse(dataString) as T;
      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
        request: response.request,
        exceptionMessage: "",
        data: parsedData,
      } as ResponseData<T>;
    }
  }

  private handleError<T>(error: AxiosError): ResponseData<T> {
    let message = "";
    let level: AlertLevel;
    let type: AlertType;
    switch (error.response?.status ?? 0) {
      case 400:
      case 422:
        message = this.getMessageFromResponseData(error, message);
        level = AlertLevel.warning;
        type = AlertType.default;
        break;
      case 401:
        message = "Access denied.";
        level = AlertLevel.warning;
        type = AlertType.userAccess;
        break;
      case 403:
        message = "Access Forbidden. The information you are trying to access requires higher permission levels.";
        level = AlertLevel.warning;
        type = AlertType.default;
        break;
      case 500:
        message = "An internal server error has occurred, please contact support.";
        level = AlertLevel.error;
        type = AlertType.default;
        break;
      default:
        message = this.getDefaultErrorMessage(error);
        level = AlertLevel.error;
        type = AlertType.default;
        break;
    }

    return {
      status: error.response?.status,
      statusText: error.response?.statusText,
      config: error.response?.config,
      headers: error.response?.headers,
      request: error.request,
      success: false,
      exceptionMessage: message,
      alertLevel: level,
      alertType: type,
    };
  }

  private getMessageFromResponseData(error: AxiosError<unknown, any>, message: string) {
    if (error.response?.data) {
      if (typeof error.response.data === 'string') {
        message += error.response.data;
      } else {
        const entries = Object.entries(error.response.data);
        const dataMap = new Map(entries);

        console.debug('DataMap', dataMap);

        if (dataMap.has('detail')) {
          message += dataMap.get('detail');
        } else if (dataMap.has('errors')) {
          const errorsEntries = Object.entries(dataMap.get('errors'));
          const errorsMap = new Map(errorsEntries);
          message += this.getMessageFromIterator(errorsMap.entries());
        } else {
          message += this.getMessageFromIterator(dataMap.entries());
        }
      }
    }
    return message;
  }

  private getMessageFromIterator(entries: IterableIterator<[string, any]>) {
    let message = "";
    for (const [key, value] of entries) {
      message += key !== "" ? `${key}: ` : "";
      if (Array.isArray(value)) {
        let content = "";
        value.forEach(element => {
          content += content.length > 0 ? ", " : "";
          content += element;
        });
        message += content;
      }
      message += "\n";
    }
    return message;
  }

  private getDefaultErrorMessage(error: AxiosError): string {
    let message = error.message;

    const errorMessageDictionary = new Map<string, string>();
    errorMessageDictionary.set("ERR_CONNECTION_REFUSED", "Unable to reach the server. Contact support.");
    errorMessageDictionary.set("ERR_NETWORK", "Failed to reach the server.");
    errorMessageDictionary.set("ERR_BAD_RESPONSE", "Server returned an error. Contact support.");

    if (errorMessageDictionary.has(error.code ?? "")) {
      message += `: ${errorMessageDictionary.get(error.code!)}`;
    }

    return message;
  }


}

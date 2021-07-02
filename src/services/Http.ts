import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { IHttp, IError, IHttpParam } from '../interfaces/IHttp';
import { IToken } from '../interfaces/IAuth';
import config from '../config';
import { getToken } from '../utils/token';

export default class Http implements IHttp {
  private instance;
  private headers;

  constructor(baseUrl: string = config.apiUrl as string) {
    this.headers = this.getHeaders();

    this.instance = axios.create({
      baseURL: baseUrl,
    });

    this.initialInterceptors();
  }

  private initialInterceptors = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );

    this.instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    config = {
      ...config,
      headers: {
        ...config.headers,
        ...this.getHeaders(),
        ...this.headers,
      },
    };

    return config;
  };

  private handleResponse = (response: AxiosResponse) => {
    return response.data;
  };

  private handleError = (err: any): Promise<IError> => {
    if (err.response) {
      const { status, data, headers } = err.response;
      if (status === 401) {
        window.location.href = '/login';
      }
      if (status === 404) {
        window.location.href = '/not-found';
      }
      if (status === 403) {
        window.location.href = '/unauthorize';
      }
      return Promise.reject({
        status,
        data,
        headers,
      });
    } else {
      return Promise.reject({
        status: 500,
        headers: null,
        data: err.message,
      });
    }
  };

  getHeaders = () => {
    const token = this.token();

    const headers: any = {
      'content-type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    return headers;
  };

  token = (): string | undefined => {
    let t: IToken | null = getToken({ name: config.tokenName });
    return t?.token;
  };

  changeHeaders = (headerConfig: any) => {
    this.headers = {
      ...this.headers,
      ...headerConfig,
    };
  };

  get<T>(args: IHttpParam): Promise<T> {
    return this.instance.get(args.endpoint).then((response: any) => {
      return response as T;
    });
  }

  post<T>(args: IHttpParam): Promise<T> {
    return this.instance
      .post(args.endpoint, args.payload, args.config)
      .then((response: any) => {
        return response as T;
      });
  }

  patch<T>(args: IHttpParam): Promise<T> {
    return this.instance
      .patch(args.endpoint, args.payload)
      .then((response: any) => {
        return response as T;
      });
  }

  put<T>(parameters: IHttpParam): Promise<T> {
    return this.instance
      .put(parameters.endpoint, parameters.payload, parameters.config)
      .then((response: any) => {
        return response as T;
      });
  }

  delete<T>(parameters: any): Promise<T> {
    return Promise.resolve({} as T);
  }
}

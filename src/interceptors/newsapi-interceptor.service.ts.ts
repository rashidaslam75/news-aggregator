
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { environments } from "../environments/environment";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "X-Api-Key": environments.NEWS_API_KEY,
  "Authorization": environments.NEWS_API_KEY,
};

class NewsApiInterceptorService {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({ baseURL: "https://newsapi.org/v2", headers });

    http.interceptors.response.use((response) => {
      return response
    }, (error) => {
      // Handle global response here
      const { response } = error;
      return this.handleError(response);
    });

    this.instance = http;
    return http;
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error: any) {
    return Promise.reject(error?.data);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }
}

export const newsApiInterceptor = new NewsApiInterceptorService();

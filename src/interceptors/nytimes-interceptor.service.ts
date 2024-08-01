
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json"
};

class NyTimesInterceptorService {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: "https://api.nytimes.com/svc/search/v2",
      headers
    });

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

export const nyTimesInterceptor = new NyTimesInterceptorService();

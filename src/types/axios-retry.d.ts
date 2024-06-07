declare module "axios-retry" {
  import { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

  interface IAxiosRetryConfig {
    retries?: number;
    retryCondition?: (error: AxiosError) => boolean;
    retryDelay?: (retryCount: number, error: AxiosError) => number;
  }

  function axiosRetry(
    axios: AxiosInstance,
    axiosRetryConfig?: IAxiosRetryConfig
  ): void;

  export default axiosRetry;
}

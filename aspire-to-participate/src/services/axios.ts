import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";

class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | AxiosError> {
    try {
      return await this.axiosInstance.get<T>(url, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.handleError(error);
        return error;
      }
      return new AxiosError<T>();
    }
  }

  private handleError(error: AxiosError) {
    // Handle error
    console.log("error=>", error);
  }
}

export default new AxiosService("https://db.cec.gov.tw/static/elections/data");

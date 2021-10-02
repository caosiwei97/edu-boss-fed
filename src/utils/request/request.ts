import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosPromise,
} from 'axios'
import errorHandle from './error'

class HttpRequest {
  timeout: number
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.timeout = 10 * 1000
  }

  get(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<never> {
    return this._createAxiosInstance({
      url,
      method: 'get',
      params,
      ...config,
    })
  }

  post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<never> {
    return this._createAxiosInstance({
      url,
      method: 'post',
      data,
      ...config,
    })
  }

  _getDefaultConfig(): Partial<AxiosRequestConfig> {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
    }
  }

  _createAxiosInstance(options: AxiosRequestConfig): AxiosPromise<never> {
    const instance = axios.create()
    this.configInterceptors(instance)
    return instance({
      ...this._getDefaultConfig(),
      ...options,
    })
  }

  configInterceptors(instance: AxiosInstance): void {
    // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么
        return config
      },
      (error: AxiosError) => {
        // 对请求错误做些什么
        return Promise.reject(error)
      },
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      (res) => {
        // 对响应数据做点什么
        if (res.status === 200) return Promise.resolve(res.data)
        return Promise.reject(res)
      },
      (error: AxiosError) => {
        // 对响应错误做点什么
        return errorHandle(error)
      },
    )
  }
}

export default HttpRequest

import { AxiosError } from 'axios'

/**
 * axios统一错误处理主要针对HTTP状态码错误
 * @param {Object} AxiosError
 */
function errorHandle(err: AxiosError) {
  // 判断服务器是否响应了
  if (err.response) {
    switch (err.response.status) {
      // 用户无权限访问接口
      case 401:
        alert('请您先登录~')
        break
      // 请求的资源不存在
      case 404:
        // 处理404
        alert('您请求的资源不存在呢~')
        break
      // 服务器500错误
      case 500:
        alert('服务器异常,请稍后再试哦~')
        break
    }
    return Promise.reject(err.response.data)
  } else if (
    err.code === 'ECONNABORTED' ||
    err.message === 'Network Error' ||
    err.message.includes('timeout') ||
    !window.navigator.onLine
  ) {
    // 处理超时和断网
    alert('网络已断开，请查看你的网络连接~')
  } else {
    // 进行其他处理
    return Promise.reject(err)
  }
}

export default errorHandle

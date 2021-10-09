import { getRefreshToken } from '@/api/user'
import router from '@/router'
import store from '@/store'
import { AxiosError, AxiosInstance } from 'axios'
import { Message } from 'element-ui'

let isRfreshing = false
const requestQueue: Array<any> = []
/**
 * axios统一错误处理主要针对HTTP状态码错误
 * @param {Object} AxiosError
 */
async function errorHandle(
  err: AxiosError,
  instance?: AxiosInstance,
): Promise<any> {
  // 判断服务器是否响应了
  if (err.response) {
    const { status } = err.response
    switch (status) {
      // 用户无权限访问接口
      case 401:
        /**
         * token无效：未提供/过期
         * 未提供：直接跳转登录页面
         * 过期：拿 refresh_token 获取最新 token，发起 refresh 请求
         * refresh 请求失败 -> 登录
         * refresh 请求成功 -> 更新 store，再次发起原先失败请求
         */
        if (!store.state.user) {
          redirectToLogin()
        } else {
          if (!isRfreshing) {
            isRfreshing = true
            try {
              const res: any = await getRefreshToken({
                refreshtoken: store.state.user.refresh_token,
              })
              // 请求成功，重新发起已经失败的请求
              // 更新 token
              store.commit('setUser', res.content)
              // 取出队列中的请求执行
              requestQueue.forEach((cb) => cb())
              // 清空
              requestQueue.length = 0
              return instance && instance(err.config)
            } catch (error) {
              redirectToLogin()
            } finally {
              isRfreshing = false
            }
          }
          // 刷新状态下把请求挂起, 存入队列
          return new Promise((resolve) => {
            requestQueue.push(() => {
              resolve(instance && instance(err.config))
            })
          })
        }
        break
      // 请求的资源不存在
      case 404:
        // 处理404
        Message.warning('您请求的资源不存在呢~')
        break
      // 服务器500错误
      case 500:
        Message.error('服务器异常,请稍后再试哦~')
        break
    }
    return Promise.reject(err.response.data)
  }
  if (
    err.code === 'ECONNABORTED' ||
    err.message === 'Network Error' ||
    err.message.includes('timeout') ||
    !window.navigator.onLine
  ) {
    // 处理超时和断网
    Message.error('网络已断开，请查看你的网络连接~')
  }
  return Promise.reject(err)
}

function redirectToLogin(): void {
  Message.warning('请您先登录~')
  store.commit('setUser', null)
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath,
    },
  })
}

export default errorHandle

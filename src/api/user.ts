import createHttpRequest from '@/utils/request'
import QueryString from 'qs'

const request = createHttpRequest()

interface User {
  phone: string
  password: string
}

interface Token {
  refreshtoken: string
}

/**
 * 登录
 * @param data User
 * @returns
 */
export const login = (data: User) =>
  request.post('/user/login', QueryString.stringify(data))

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = () => request.get('/user/getInfo')

/**
 * 刷新token
 * @returns
 */
export const getRefreshToken = (data: Token) =>
  request.post('/user/refresh_token', QueryString.stringify(data))

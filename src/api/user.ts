import createHttpRequest from '@/utils/request'
import QueryString from 'qs'

const request = createHttpRequest()
const boosRequest = createHttpRequest(process.env.VUE_APP_PREFIX_BOSS)

interface User {
  phone: string
  password: string
}

interface Token {
  refreshtoken: string
}

interface QueryParams {
  currentPage: number
  pageSize: number
  phone: string
  userId: number
  startCreateTime: string
  endCreateTime: string
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

/**
 * 分页查询用户信息
 * @param queryParam
 * @returns
 */
export const getUserPages = (queryParam: Partial<QueryParams>) =>
  boosRequest.post('/user/getUserPages', queryParam)

/**
 * 封禁用户
 * @param userId
 * @returns
 */
export const forbidUser = (userId: string | number) =>
  boosRequest.post('/user/forbidUser', { userId })

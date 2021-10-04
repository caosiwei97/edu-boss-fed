import createHttpRequest from '@/utils/request'
import QueryString from 'qs'

const request = createHttpRequest()

interface User {
  phone: string
  password: string
}
export const login = (data: User) =>
  request.post('/user/login', QueryString.stringify(data))

export const getUserInfo = () => request.get('/user/getInfo')

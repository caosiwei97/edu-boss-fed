import createHttpRequest from '@/utils/request'

const request = createHttpRequest(process.env.VUE_APP_PREFIX_BOSS)

interface QueryParam {
  code: string
  id: number
  name: string
  startCreateTime: string
  endCreateTime: string
  current: number
  size: number
}

export interface Role {
  id?: number
  code: string
  name: string
  description: string
}

/**
 * 按条件查询角色
 * @param queryParam
 * @returns
 */
export const getRoles = (queryParam: Partial<QueryParam>) =>
  request.post('/role/getRolePages', queryParam)

/**
 * 保存或者更新角色
 * @param role
 * @returns
 */
export const createOrEditRole = (role: Role) =>
  request.post('/role/saveOrUpdate', role)

/**
 * 删除角色
 * @param id
 * @returns
 */
export const deleteRole = (id: string | number) => request.delete(`/role/${id}`)

/**
 * 获取所有角色
 * @returns
 */
export const getAllRoles = () => request.get('/role/all')

/**
 * 查询用户角色
 * @returns
 */
export const getUserRole = (userId: string | number) =>
  request.get(`/role/user/${userId}`)

/**
 * 给用户分配角色
 * @param data
 * @returns
 */
export const allocateUserRoles = (data: {
  userId: string | number
  roleIdList: Array<number | string>
}) => request.post('/role/allocateUserRoles', data)

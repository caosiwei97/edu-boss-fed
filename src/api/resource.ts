import createHttpRequest from '@/utils/request'

const request = createHttpRequest(process.env.VUE_APP_PREFIX_BOSS)

interface ResourceQueryParam {
  id: number
  name: string
  startCreateTime: string
  url: string
  categoryId: number
  endCreateTime: string
  current: number
  size: number
}

interface ResourceCatagoryParam {
  resourceId: string
}

interface Resource {
  id?: number
  name: string
  categoryId: number | null
  url: string
  description?: string
}

/**
 * 按条件分页查询资源
 * @param params
 * @returns
 */
export const getResourcePages = (params: Partial<ResourceQueryParam>) =>
  request.post('/resource/getResourcePages', params)

/**
 * 获取所有资源分类
 * @param params
 * @returns
 */
export const getAllCategories = (params: Partial<ResourceCatagoryParam>) =>
  request.get('/resource/category/getAll', params)

/**
 * 删除资源
 * @param params
 * @returns
 */
export const deleteResource = (id: number) => request.delete(`/resource/${id}`)

/**
 * 保存或者更新资源
 * @param data
 * @returns
 */
export const saveOrUpdateResource = (data: Resource) =>
  request.post('/resource/saveOrUpdate', data)

/**
 * 获取角色拥有的资源列表
 * @param roleId
 * @returns
 */
export const getRoleResources = (roleId: string | number) =>
  request.get('/resource/getRoleResources', { roleId })

/**
 * 给角色分配资源
 * @param data
 * @returns
 */
export const allocateResources = (data: {
  roleId: number | string
  resourceIdList: Array<number | string>
}) => request.post('/resource/allocateRoleResources', data)

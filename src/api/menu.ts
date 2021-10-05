import createHttpRequest from '@/utils/request'

const request = createHttpRequest(process.env.VUE_APP_PREFIX_BOSS)

interface Menu {
  parentId: number
  name: string
  href: string
  id?: number
  icon?: string
  orderNum?: number
  description?: string
  shown?: boolean
}

/**
 * 获取编辑菜单页面信息
 * @param id
 * @returns
 */
export const getEditMenuInfo = (id: string | number = -1) =>
  request.get('/menu/getEditMenuInfo', { id })

/**
 * 添加/更新菜单
 * @param data
 * @returns
 */
export const saveOrUpdate = (data: Menu) =>
  request.post('/menu/saveOrUpdate', data)

/**
 * 获取所有菜单
 * @param data
 * @returns
 */
export const getAllMenu = () => request.get('/menu/getAll')

/**
 * 删除菜单
 * @param id
 * @returns
 */
export const deleteMenu = (id: string | number) => request.delete(`/menu/${id}`)

import createHttpRequest from '@/utils/request'

const request = createHttpRequest(process.env.VUE_APP_PREFIX_BOSS)

interface CourseQueryParam {
  currentPage: number
  pageSize: number
  courseName: string
  status: number | string
}

interface Section {
  id?: number | string
  courseId: number | string
  courseName?: string
  sectionName: string
  description: string
  orderNum: number
  status: number
}

interface Lesson {
  id?: number | string
  courseId: string | number
  sectionId: string | number | undefined
  sectionName: string
  theme: string
  duration: number
  isFree: boolean
  orderNum: number
  status: number
}

/**
 * 分页查询课程信息
 * @param params
 * @returns
 */
export const getCoursePages = (params: Partial<CourseQueryParam>) =>
  request.post('/course/getQueryCourses', params)

export const changeState = (stateParams: {
  courseId: string | number
  status: string | number
}) => request.get('/course/changeState', stateParams)

/**
 * 保存或者更新课程信息
 * @param data
 * @returns
 */
export const saveOrUpdateCourse = (data: any) =>
  request.post('/course/saveOrUpdateCourse', data)

/**
 * 图片上传
 * @param data
 * @param onUploadProgress 上传进度
 * @returns
 */
export const uploadImg = (
  data: FormData,
  onUploadProgress?: (e: ProgressEvent) => void,
) =>
  request.post('/course/upload', data, {
    onUploadProgress,
  })

/**
 * 通过课程Id获取课程信息
 * @param id
 * @returns
 */
export const getCourseById = (id: string | number) =>
  request.get('/course/getCourseById', { courseId: id })

/**
 * 获取章节与课程
 * @param courseId
 * @returns
 */
export const getSectionAndLesson = (courseId: string | number) =>
  request.get('/course/section/getSectionAndLesson', {
    courseId,
  })

/**
 * 新增或更新章节
 * @param data
 * @returns
 */
export const saveOrUpdateSection = (data: Partial<Section>) =>
  request.post('/course/section/saveOrUpdateSection', data)

/**
 * 新增或更新课时
 * @param data
 * @returns
 */
export const saveOrUpdateLesson = (data: Partial<Lesson>) =>
  request.post('/course/lesson/saveOrUpdate', data)

/**
 * 获取章节
 * @param sectionId
 * @returns
 */
export const getSectionById = (sectionId: string | number) =>
  request.get('/course/section/getBySectionId', { sectionId })

import HttpRequest from './request'

const baseUrl: string = process.env.VUE_APP_API

export default new HttpRequest(baseUrl)

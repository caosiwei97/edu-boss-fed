import HttpRequest from './request'

const {
  VUE_APP_API_BOSS,
  VUE_APP_API_FRONT,
  VUE_APP_PREFIX_BOSS,
  VUE_APP_PREFIX_FRONT,
} = process.env

const prefixMap: Record<string, string> = {
  [VUE_APP_PREFIX_BOSS]: VUE_APP_API_BOSS,
  [VUE_APP_PREFIX_FRONT]: VUE_APP_API_FRONT,
}

export default function createHttpRequest(prefix = VUE_APP_PREFIX_FRONT) {
  const baseURL =
    process.env.NODE_ENV === 'production' ? prefixMap[prefix] : prefix
  return new HttpRequest(baseURL)
}

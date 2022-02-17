import { merge } from 'lodash'

interface IOptions extends RequestInit {
  body?: any
}

export interface IRequest {
  (url: string, config?: IOptions): Promise<{
    code: number
    msg: string
    data: any
  }>
  get?: IRequest
}

export const request: IRequest = (url, config) => {
  url = `/api${url}`
  const { method = 'GET', mode = 'cors', body = null, ...others } = config || {}

  const token = localStorage.getItem('token')
  const options = {
    method: method.toUpperCase(),
    mode,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...others,
  }
  if (body) {
    Object.assign(options, { body: JSON.stringify(body) })
  }
  return fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw Error('接口请求异常')
      }
      return res.json()
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

/**
 * GET请求
 */
request.get = (url, config) => {
  return request(url, { method: 'GET', ...config })
}

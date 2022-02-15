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
  const { method = '', mode = 'cors', body = {}, ...others } = config || {}
  return fetch(url, {
    method: method.toUpperCase(),
    mode,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...others,
  })
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

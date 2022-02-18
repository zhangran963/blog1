import { token } from './token'

const interceptors_req = [],
  interceptors_res = []

interface IOptions extends RequestInit {
  isOrigin?: boolean
  body?: any
}

interface IRes {
  code: number
  msg: string
  data: any
}

interface IInterceptorRequest {
  (): void
}
export interface IRequest {
  (url: string, config?: IOptions): Promise<IRes | any>
  // interceptors: {
  //   request: {
  //     use: IInterceptorRequest
  //   }
  // }
}

/**
 * 封装的网络请求
 */
export const request: IRequest = (url, config) => {
  url = `/api${url}`
  const {
    isOrigin = false,
    method = 'GET',
    mode = 'cors',
    body = null,
    ...others
  } = config || {}

  const tokenVal = token.get()
  const options = {
    method: method.toUpperCase(),
    mode,
    headers: {
      'Content-Type': 'application/json',
      Authorization: tokenVal ? `Bearer ${tokenVal}` : '',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...others,
  }
  if (body) {
    Object.assign(options, { body: JSON.stringify(body) })
  }
  return fetch(url, options)
    .then(async (res) => {
      /* 构造错误 */
      if (!res.ok) {
        const err = res.statusText
        return Promise.reject(err)
      }

      return res.json()
    })
    .then((res: IRes) => {
      if (isOrigin) {
        return res
      } else if (res && res.code === 0) {
        return res.data
      } else {
        return Promise.reject(res.msg)
      }
    })
  // .catch((err) => {
  //   // this.errorMessage = err
  //   // const { name, message, stack } = err
  //   console.log('fetch.catch: ', err)
  //   return err
  // })
}

// /**
//  * GET请求
//  */
// request.get = (url, config) => {
//   return request(url, { method: 'GET', ...config })
// }

// request.interceptors.request.use = function () {
//   console.log('* ')
// }
// request.interceptors = {
//   request: {
//     use: {
//       code: 1,
//       msg: '',
//       data: {},
//     },
//   },
// }

// request.interceptors = {
//   request: {
//     use: function (callback: Function = () => {}) {
//       interceptors_req.push(callback)
//     },
//   },
// }

import { request } from '@/utils'

interface IRegister {
  (params: unknown): Promise<{
    code: number
    msg: string
    data: {
      name: string
      filename: string
      url: string
      _source: unknown
    }
  }>
}

export const register: IRegister = (params = {}) => {
  return request('/user/register', {
    method: 'POST',
    body: params,
  })
}

interface ILogin {
  (params: unknown): Promise<{
    code: number
    msg: string
    data: {
      name: string
      filename: string
      url: string
      _source: unknown
    }
  }>
}
export const login: ILogin = (params = {}) => {
  return request('/user/login', {
    method: 'POST',
    body: params,
  })
}

export const property: IRegister = (params = {}) => {
  return request('/user/property', {
    method: 'POST',
    body: params,
  })
}

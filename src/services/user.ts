import { request } from '@/utils'

export interface IUserInfo {
  username: string
}
interface IUserInfoFunc {
  (): Promise<{
    code: number
    msg: string
    data: IUserInfo
  }>
}
export const getUserInfo: IUserInfoFunc = (params = {}) => {
  return request('/user/info', {})
}

/**
 * 注册
 */
interface IRegisterFunc {
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

export const register: IRegisterFunc = (params = {}) => {
  return request('/user/register', {
    method: 'POST',
    body: params,
  })
}

/**
 * 登录
 */
interface ILoginFunc {
  (params: unknown): Promise<{
    code: number
    msg: string
    data: {
      userInfo: {
        username: string
        email: string
        phone: string
      }
      token: string
    }
  }>
}
export const login: ILoginFunc = (params = {}) => {
  return request('/user/login', {
    method: 'POST',
    body: params,
  })
}

export const property: IRegisterFunc = (params = {}) => {
  return request('/user/property', {
    method: 'POST',
    body: params,
  })
}

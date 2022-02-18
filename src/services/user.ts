import { request } from '@/utils'

export interface IUserInfo {
  avatar: string
  username: string
  birthday: string
  email: string
  phone_number: string
}
export const getUserInfo = (params = {}) => {
  return request('/user/info', params).then((res) => {
    localStorage.setItem('userInfo', JSON.stringify(res))
    return res
  }) as Promise<IUserInfo>
}

/**
 * 注册
 */
interface IRegisterRes {
  avatar: string
  username: string
  birthday: string
  email: string
  phone_number: string
}
export const register = (params = {}) => {
  return request('/user/register', {
    method: 'POST',
    body: params,
  }) as Promise<IRegisterRes>
}

/**
 * 登录
 */
export interface ILoginRes {
  userInfo: {
    username: string
    email: string
    phone: string
  }
  token: string
}
export const login = (params = {}) => {
  return request('/user/login', {
    method: 'POST',
    body: params,
  }) as Promise<ILoginRes>
}

/**
 * 读取属性
 */
export const property = (params = {}) => {
  return request('/user/property', {
    method: 'POST',
    body: params,
  }) as Promise<IRegisterRes>
}

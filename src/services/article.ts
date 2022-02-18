import { request } from '@/utils'

export interface IArticleItem {
  title: string
  avatar: string
  tags: string[]
  content: string
}
export const getList = (params = {}) => {
  return request('/article/list', {
    method: 'GET',
    ...params,
  }) as Promise<IArticleItem[]>
}

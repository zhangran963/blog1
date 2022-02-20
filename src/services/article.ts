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

/**
 * 文章基本信息
 */
export interface IArticleInfo {
  title: string
}
export const saveArticle = (params = {}) => {
  return request('/article/create', {
    method: 'POST',
    body: params,
  }) as Promise<IArticleInfo>
}

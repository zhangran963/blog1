import { Toast } from './function-call'

export type ToastType = 'text' | 'loading' | 'success' | 'fail' | 'html'

export type ToastOptions = {
  type?: ToastType
  text?: string
  duration?: number
}

/**
 * 定义:
 * 组件属性上, 自定义添加的方法
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: typeof Toast
    globalShowBg: boolean
  }
}

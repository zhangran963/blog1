export const extend = Object.assign
export const inBrowser = typeof window !== 'undefined'

export const sleep = (time = 0) => new Promise((res) => setTimeout(res, time))

/**
 * 类型
 */
export const isObject = (val: unknown) =>
  val !== null && typeof val === 'object'

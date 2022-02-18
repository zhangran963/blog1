import { extend } from './tool'
import { createApp, Component, reactive } from 'vue'

export function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent)
  const rootEle = document.createElement('div')
  rootEle.classList.add('my-container')
  document.body.appendChild(rootEle)
  const instance = app.mount(rootEle)
  return {
    instance,
    unmount() {
      app.unmount()
      document.body.removeChild(rootEle)
    },
  }
}

/**
 * 生成popover用到的一般属性
 */
export function usePopperState(props: Record<string, unknown>) {
  const state = reactive({
    ...props,
    show: false,
  })

  const toggle = (show: boolean) => {
    state.show = show
  }

  const open = (props: Record<string, unknown>) => {
    extend(state, props)
    toggle(true)
  }

  const close = () => toggle(false)

  return {
    state,
    toggle,
    open,
    close,
  }
}

import { getCurrentInstance, ComponentPublicInstance, reactive, App } from 'vue'
import { ToastOptions } from './types'
import {
  mountComponent,
  usePopperState,
  sleep,
  extend,
  isObject,
} from '@/utils/index'
import { withInstall } from '../with-install'
import MyToast from './main.vue'

// let cacheInstance = null

function createInstance() {
  const { instance, unmount } = mountComponent({
    setup() {
      const { state, toggle, open, close } = usePopperState({
        text: '[请写消息文本]',
      })

      const render = () => {
        const attrs = {
          onClosed() {
            unmount()
          },
          'onUpdate:show': toggle,
        }

        return <MyToast {...state} {...attrs}></MyToast>
      }
      const vm = getCurrentInstance() as any
      vm.render = render

      return {
        toggle,
        open,
        close,
      }
    },
  })

  return instance
}

function parseOptions(options: string | ToastOptions): ToastOptions {
  return extend(
    {
      duration: 3000,
    },
    (isObject(options) ? options : { text: options }) as ToastOptions
  )
}

export type ComponentInstance = ComponentPublicInstance
function Toast(options: string | ToastOptions = {}): Promise<any> {
  const app = createInstance() as ComponentInstance
  const parsedOptions = parseOptions(options)

  // @ts-ignore
  app.open(parsedOptions)

  // @ts-ignore
  return sleep(parsedOptions.duration).then(() => {
    // @ts-ignore
    app.close()
  })
}

Toast.install = (app: App) => {
  app.use(withInstall(MyToast))
  app.config.globalProperties.$toast = Toast
}

export { Toast }
